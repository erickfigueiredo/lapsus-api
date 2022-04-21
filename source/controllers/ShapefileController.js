const Shapefile = require('../models/Shapefile');
const User = require('../models/User');
const ShapefileValidator = require('../validators/ShapefileValidator');

const multer = require('multer');
const multerConfig = require('../config/Multer');

const remFiles = require('../utils/RemoveFiles');


class ShapefileController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const shp = await Shapefile.findOne(id);
        delete shp.shapefile.path;
        
        return shp.success ? res.send(shp) : res.status(404).send(shp);
    }

    static async index(req, res) {
        let method = req.query.is_uri;

        if (method !== 'y') method = 'n';

        const shps = await Shapefile.findAll(method);
        return shps.success ? res.send(shps) : res.status(404).send(shps);
    }

    static async getAmount(req, res) {
        const result = await Shapefile.getShapefilesAmount();
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async create(req, res) {
        const fileProps = {
            allowedMimes: ['application/zip', 'application/x-zip-compressed'],
            numFiles: 1,
            maxSize: 10 // 10mb 
        };

        const upload = multer(multerConfig('shapefiles', fileProps)).single('file');
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError) {
                let message;
                if (fail.code === 'LIMIT_FILE_SIZE')
                    message = `O arquivo excede o limite de ${fileProps.maxSize} mb!`;

                else if (fail.code === 'LIMIT_FILE_COUNT')
                    message = `O número de arquivos excede o limite de ${fileProps.numFiles}!`;

                else message = 'É necessário submeter um único arquivo .zip!';

                return res.status(400).send({ success: false, message });
            }

            if (!req.file) {
                return res.status(400).send({ success: false, message: 'É necessário submeter um arquivo!' });
            }

            req.body = JSON.parse(req.body.data);

            const valid = ShapefileValidator.createValidate();
            const { error } = valid.validate(req.body);
            
            if (error) {
                remFiles([req.file]);
                return res.status(400).send({ success: false, message: error.details[0].message });
            }
            
            if (!req.body.desc) { req.body.desc = ''; }
            
            const existAdder = await User.findOneByType(req.locals.id, 'A');
            if (!existAdder.success) {
                remFiles([req.file]);
                return res.status(404).send({ success: false, message: 'Usuário administrador inexistente!' });
            }

            req.body.title = req.body.title.toLowerCase();

            const existTitle = await Shapefile.findByTitle(req.body.title);
            if (existTitle.success) {
                remFiles([req.file]);
                return res.status(409).send({ success: false, message: 'Título já cadastrado!' });
            }

            req.body.uri = `/shapefiles/${req.file.key}`;
            req.body.path = req.file.path;

            req.body.added_by = req.locals.id;

            const result = await Shapefile.create(req.body);
            if (!result.success) {
                remFiles([req.file]);

                return res.status(400).send(result);
            }

            return res.status(201).send(result);
        });
    }

    static async update(req, res) {
        const valid = ShapefileValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const shp = await Shapefile.findOne(form.id);

        if (shp.success) {
            const toUpdate = {};

            if (form.title) {
                form.title = form.title.toLowerCase();

                if (shp.shapefile.title !== form.title) {
                    const existTitle = await Shapefile.findByTitle(form.title);

                    if (existTitle.success) {
                        return res.status(409).send({ success: false, message: 'Título já cadastrado!' });
                    }

                    toUpdate.title = form.title;
                }
            }

            if (form.desc === '') { toUpdate.desc = ''; }
            else if (form.desc && shp.shapefile.desc !== form.desc) { toUpdate.desc = form.desc; }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Shapefile.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(shp);
        }
        return res.status(404).send(shp);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const shp = await Shapefile.findOne(id);
        if (!shp.success) {
            return res.status(404).send({ success: false, message: 'Shapefile inexistente!' });
        }

        const result = await Shapefile.delete(id);
        if (!result.success) {
            return res.status(400).send(result);
        }

        remFiles([{ path: shp.shapefile.path }], true);

        return res.send(result);
    }
}

module.exports = ShapefileController;
