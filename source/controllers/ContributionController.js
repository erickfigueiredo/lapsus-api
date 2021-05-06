const Category = require('../models/Category');
const Contribution = require('../models/Contribution');
const User = require('../models/User');
const ContributionValidator = require('../validators/CategoryValidator');

const multer = require('multer');
const multerConfig = require('../config/Multer');

const fs = require('fs');
const path = require('path');

class ContributionController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const ctb = await Contribution.findOne(id);
        return ctb.success ? res.send(ctb) : res.status(404).send(ctb);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const ctbs = await Contribution.findAll(page);
        return ctbs.success ? res.send(ctbs) : res.status(404).send(ctbs);
    }

    static async create(req, res) {
        const fileProps = { allowedMimes: ['image/png', 'image/jpeg', 'audio/mpeg', 'video/mp4'], numFiles: 5 };

        const upload = multer(multerConfig('annexes', fileProps)).array('file', 5);
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Os arquivos não atendem aos requisitos necessários!' });


            req.body = JSON.parse(req.body.data);

            const valid = ContributionValidator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                if (req.files) this.deleteFiles(req.files);


                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            if (req.body.id_collaborator) {
                const existCollaborator = User.findOneByType(req.body.id_collaborator, 'R');

                if (!existCollaborator.success) {
                    if (req.files) this.deleteFiles(req.files);
                
                return res.status(404).send({ success: false, message: 'Colaborador inexistente!' });
            }
            

            const existCategory = Category.findOne(req.body.id_category);
            if (!existCategory.success) {
                if (req.files) this.deleteFiles(req.files);


                return res.status(404).send({ success: false, message: 'Categoria inexistente!' });
            }

            let result = null;
            if (req.files) {
                const files = req.files.map(file => { return { uri: file.key, path: file.path } });
                result = await Contribution.create(req.body, files);
            } else
                result = await Contribution.create(req.body);

            if (!result.success) {
                if (req.files) this.deleteFiles(req.files);

                return res.status(400).send(result);
            }
            return res.send(result);
        });
    }

    static async alterStatus(req, res) {
        const valid = ContributionValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        // Verificar se o id_manager existe


        const result = await Contribution.update(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        existContribution = await Contribution.findOne(id);
        if (!existContribution.success)
            return res.status(404).send(existContribution);


        const result = await Contribution.delete(id);
        if (result.success) {
            if(result.uriAnnexes[0]) this.deleteFiles(result.uriAnnexes, false);

            return res.send(result);
        }

        return res.status(400).send(result);
    }

    static deleteFiles(files, hasPath = true) {
        if(hasPath) for (const file of files) fs.unlinkSync(`${file.path}`);
        
        // Ajustar
        else for (const uri of files) fs.unlinkSync(path.resolve(__dirname, '..', '..', 'upload', 'annexes', uri));
    }
}

module.exports = ContributionController;
