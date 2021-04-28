const Shapefile = require('../models/Shapefile');
const ShapefileValidator = require('../validators/ShapefileValidator');

const multer = require('multer');
const multerConfig = require('../config/Multer');

const extract = require('extract-zip');
const fs = require('fs');

class ShapefileController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const shp = await Shapefile.findOne(id);
        return shp.success ? res.send(shp) : res.status(404).send(shp);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const shps = await Shapefile.findAll(page);
        return shps.success ? res.send(shps) : res.status(404).send(shps);
    }

    //! Espera receber o added_by do middleware, ja validado
    static async create(req, res) {
        const fileProps = { allowedMimes: 'application/zip', numFiles: 1};

        const upload = multer(multerConfig('shapefiles', fileProps)).single('file');
        upload(req, res, async (fail) => {
            
            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Extensão de arquivo inválida!' });
            

            if (!req.file)
                return res.send({ success: false, message: 'É necessário submeter um arquivo!' });


            req.body = JSON.parse(req.body.data);

            const valid = ShapefileValidator.createValidate();

            const { error } = valid.validate(req.body);


            if (error) {
                fs.unlinkSync(`${req.file.path}`);
                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            const existTitle = Shapefile.findByTitle(req.body.title);
            if (existTitle.success) {
                fs.unlinkSync(`${req.file.path}`);
                return res.status(409).send({ success: false, message: 'Título já cadastrado!' });
            }

            const newKey = req.file.key.split('.');

            try {
                await extract(req.file.path, { dir: `${req.file.destination}\\${newKey[0]}` });

                fs.unlinkSync(`${req.file.path}`);

            } catch (e) {
                fs.unlinkSync(`${req.file.path}`);

                return res.status(500).send({ success: false, message: 'Houve um erro ao extrair o arquivo!' });
            }

            req.body.uri = newKey[0];

            const result = await Shapefile.create(req.body);
            return result.success ? res.send(result) : res.status(400).send(result);
        });
    }

    static async update(req, res) {
        const valid = ShapefileValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const form = req.body;

        const shp = await Shapefile.findOne(form.id);

        if (shp.success) {
            const toUpdate = {};

            if (form.title && shp.shapefile.title != form.title) {
                const existTitle = await Shapefile.findByTitle(form.title);
                if (existTitle.success)
                    return res.status(409).send({ success: false, message: 'Título já cadastrado!' });


                toUpdate.title = form.title;
            }

            if (form.desc && shp.shapefile.desc != form.desc) toUpdate.desc = form.desc;

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Shapefile.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(shp);
        }
        return res.status(404).send({ success: false, message: 'Shapefile inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const shp = await Shapefile.findOne(id);
        if (!shp.success)
            return res.status(404).send({ success: false, message: 'Shapefile inexistente!' });


        const result = await Shapefile.delete(id, shp.shapefile.uri);
        result.success ? res.send(result) : res.status(400).send(result)
    }
}

module.exports = ShapefileController;
