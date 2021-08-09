const Category = require('../models/Category');
const Contribution = require('../models/Contribution');
const User = require('../models/User');
const ContributionValidator = require('../validators/ContributionValidator');

const multer = require('multer');
const multerConfig = require('../config/Multer');

const fs = require('fs');

class ContributionController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const ctb = await Contribution.findOne(id);
        return ctb.success ? res.send(ctb) : res.status(404).send(ctb);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const ctbs = await Contribution.findAll(page);
        return ctbs.success ? res.send(ctbs) : res.status(404).send(ctbs);
    }

    static async create(req, res) {
        const fileProps = { allowedMimes: ['image/png', 'image/jpeg', 'audio/mpeg', 'video/mp4'], numFiles: 5 };

        const upload = multer(multerConfig('annexes', fileProps)).array('file', 5);
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError) {
                console.log(fail)
                return res.status(400).send({ success: false, message: 'Os arquivos não atendem aos requisitos necessários!' });
            }

            req.body = JSON.parse(req.body.data);

            const valid = ContributionValidator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                if (req.files) { for (const file of req.files) { fs.unlinkSync(`${file.path}`); } }

                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            if (req.body.id_collaborator) {
                const existCollaborator = await User.findOneByType(req.body.id_collaborator, 'R');

                if (!existCollaborator.success) {
                    if (req.files) { for (const file of req.files) { fs.unlinkSync(`${file.path}`); } }

                    return res.status(404).send(existCollaborator);
                }
            }

            const existCategory = await Category.findOne(req.body.id_category);
            if (!existCategory.success) {
                if (req.files) { for (const file of req.files) { fs.unlinkSync(`${file.path}`); } }

                return res.status(404).send(existCategory);
            }

            let result = null;

            if (req.files) {
                const files = req.files.map(file => { return { uri: file.path } });
                
                result = await Contribution.create(req.body, files);
            } else {
                result = await Contribution.create(req.body);
            }

            if (!result.success) {
                if (req.files) { for (const file of req.files) { fs.unlinkSync(`${file.path}`); } };

                return res.status(400).send(result);
            }

            return res.send(result);
        });
    }

    static async evaluateStatus(req, res) {
        const valid = ContributionValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existContribution = await Contribution.findOne(req.body.id);
        if(!existContribution.success) {
            return res.status(404).send(existContribution);
        }

        const existManager = await User.findOneManager(req.body.id_manager);
        if (!existManager.success) {
            return res.status(404).send(existManager);
        }
        
        const result = await Contribution.update(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = ContributionController;
