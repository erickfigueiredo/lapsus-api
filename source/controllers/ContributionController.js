const Category = require('../models/Category');
const Contribution = require('../models/Contribution');
const User = require('../models/User');
const ContributionValidator = require('../validators/ContributionValidator');

const remFiles = require('../utils/RemoveFiles');
const coordsHandler = require('../utils/CoordsHandler');

const multer = require('multer');
const multerConfig = require('../config/Multer');

class ContributionController {

    static async show(req, res) {

        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const ctb = await Contribution.findOne(id);
        return ctb.success ? res.send(ctb) : res.status(404).send(ctb);
    }

    static async publishRelationship(req, res) {
        const result = await Contribution.getPublishRelationship();
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async publishRelationshipByUser(req, res) {
        const result = await Contribution.getPublishRelationshipByUser(req.locals.id);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async index(req, res) {

        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const ctbs = await Contribution.findAll(page);

        if (ctbs.success) {
            for (const c of ctbs.contribution.data) {
                c.local = coordsHandler(c.local);
            }

            return res.send(ctbs);
        }

        return res.status(404).send(ctbs);
    }

    static async indexDetailed(req, res) {
        req.query.lat = parseFloat(req.query.lat);
        req.query.long = parseFloat(req.query.long);

        if (isNaN(req.query.lat) || isNaN(req.query.long)) {
            return res.status(400).send({ success: false, message: 'Centro inválido!' });
        } else if ((-90 > req.query.lat || req.query.lat > 90)
        || (-180 > req.query.long || req.query.long > 180)) {
            return res.status(400).send({ success: false, message: 'Coordenada inválida!' });
        }

        let degrees;
        if (isNaN(parseFloat(req.query.distance))) {
            degrees = 0.13500135001350; // 15 KM
        } else {
            // Converte km em graus (1 grau - 111,11 km)
            degrees = (Math.abs(parseFloat(req.query.distance)) / 111.11).toFixed(14);
        }

        const result = await Contribution.findAllDetailed({ x: req.query.lat, y: req.query.long }, degrees);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async create(req, res) {

        let qttAnnexes = parseInt(process.env.ANNEX_QUANTITY);
        if (isNaN(qttAnnexes)) qttAnnexes = 5;

        const fileProps = {
            allowedMimes: ['image/png', 'image/jpeg', 'application/pdf', 'audio/mpeg', 'video/mp4'],
            numFiles: qttAnnexes,
            maxSize: 10 //10mb
        };

        const upload = multer(multerConfig('annexes', fileProps)).array('file', qttAnnexes);
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError) {
                let message;
                if (fail.code === 'LIMIT_FILE_SIZE')
                    message = `Um ou mais arquivos excedem o limite de ${fileProps.maxSize} mb!`;

                else if (fail.code === 'LIMIT_FILE_COUNT')
                    message = `O número de arquivos excede o limite de ${fileProps.numFiles}!`;

                else message = 'Um ou mais arquivos possuem extensão inválida!';

                return res.status(400).send({ success: false, message });
            }

            req.body = JSON.parse(req.body.data);

            const valid = ContributionValidator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                if (req.files.length) remFiles(req.files);

                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            if (req.body.id_collaborator) {
                const existCollaborator = await User.findOneByType(req.body.id_collaborator, ['R', 'M']);

                if (!existCollaborator.success) {
                    if (req.files.length) remFiles(req.files);

                    return res.status(404).send(existCollaborator);
                }
            }

            const existCategory = await Category.findOne(req.body.id_category);
            if (!existCategory.success) {
                if (req.files.length) remFiles(req.files);

                return res.status(404).send(existCategory);
            }

            let result = null;
            if (req.files.length) {
                const files = req.files.map(file => {
                    return {
                        uri: `/annexes/${file.key}`,
                        path: file.path
                    }
                });

                result = await Contribution.create(req.body, files);
            } else {
                result = await Contribution.create(req.body);
            }

            if (!result.success) {
                if (req.files.length) remFiles(req.files);

                return res.status(400).send(result);
            }

            return res.status(201).send(result);
        });
    }

    static async evaluateStatus(req, res) {

        const valid = ContributionValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existManager = await User.findOneByType(req.locals.id, ['A', 'T', 'M']);
        if (!existManager.success) {
            return res.status(404).send(existManager);
        }

        const existContribution = await Contribution.findOne(req.body.id);
        if (!existContribution.success) {
            return res.status(404).send(existContribution);
        }

        req.body.id_manager = req.locals.id;

        const result = await Contribution.update(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = ContributionController;
