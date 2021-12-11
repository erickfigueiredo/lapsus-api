const EMSI = require('../models/EMSI');
const User = require('../models/User');
const Nominatim = require('../models/Nominatim');

const remFiles = require('../utils/RemoveFiles');

const Actor = require('../models/etype/Actor');
const Category = require('../models/Category');
const Cause = require('../models/event/Cause');
const Casualties = require('../models/context/Casualties');
const Contribution = require('../models/Contribution');
const Risk = require('../models/event/Risk');
const Scale = require('../models/event/Scale');
const Loctype = require('../models/etype/Loctype');
const Status = require('../models/egeo/Status');
const Type = require('../models/egeo/Type');
const Weather = require('../models/egeo/Weather');

const EMSIValidator = require('../validators/EMSIValidator');

const { v4: uuidV4 } = require('uuid');

const multer = require('multer');
const multerConfig = require('../config/Multer');

class EMSIController {

    static getFileType(mimetype) {
        if (mimetype.includes('pdf') || mimetype.includes('rtf') || mimetype.includes('opendocument')) return 'MANUAL';
        if (mimetype.includes('jpeg') || mimetype.includes('png')) return 'PHOTO';
        if (mimetype.includes('tiff') || mimetype.includes('geotiff')) return 'MAP'

        return 'OTHER';
    }

    static async getFormLists(req, res) {
        const actor = await Actor.listAll();
        const category = await Category.listAll();
        const cause = await Cause.listAll();
        const casualties = await Casualties.listAll();
        const contribution = await Contribution.listAll();
        const loctype = await Loctype.listAll();
        const status = await Status.listAll();
        const type = await Type.listAll();
        const weather = await Weather.listAll();
        const scale = await Scale.listAll();
        const risk = await Risk.listAll();

        // Mudar aqui, retornar uma mensagem de erro mais precisa

        // Colocar o retorno em ordem alfabetica

        if (actor.success && category.success && cause.success && type.success &&
            casualties.success && loctype.success && scale.success && status.success 
            && weather.success && risk.success) {
            return res.send({
                success: true,
                actor: actor.actor,
                category: category.category,
                cause: cause.cause,
                type: type.type,
                casualties: casualties.casualties,
                contribution: contribution.contribution,
                loctype: loctype.loctype,
                risk: risk.risk,
                type: type.type,
                scale: scale.scale,
                status: status.status,
                weather: weather.weather
            });
        }

        return res.status(404).send({ success: false, message: 'Houve um erro ao recuperar as listas para registro EMSI!' })
    }

    static async create(req, res) {
        // Mudar essas propriedades talvez
        const fileProps = {
            allowedMimes: ['image/png', 'image/jpeg', 'application/vnd.oasis.opendocument.text', 'application/pdf', 'application/rtf', 'audio/mp3', 'video/mp4', 'text/xml', 'application/msword', 'application/json'], 
            numFiles: 5
        };

        const upload = multer(multerConfig('annexes', fileProps)).array('file', 5);
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError) {
                return res.status(400).send({ success: false, message: 'os arquivos não atendem aos requisitos necessários!' });
            }

            req.body = JSON.parse(req.body.data);

            const valid = EMSIValidator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                if (req.files.length) remFiles(req.files);
                
                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            const existManager = await User.findOneManager(/*req.locals.id*/ 1);
            if(!existManager.success){ 
                if (req.files.length) remFiles(req.files);
                return res.status(404).send(existManager.message);
            }

            // Propriedades estáticas que tornam o sistema especifico para deslizamentos de terra
            const staticEventData = {
                id: uuidV4(),
                source: 'HUMOBS',
                // Hora de observação pega do sistema
            };

            const staticContextData = {
                id: uuidV4(),
                seclass: 'UNCLAS',
                mode: 'ACTUAL',
                msgtype: 'ALERT',
                level: 'STRTGC'
                //Creation pego do sistema
            };

            req.body.event = {
                ...req.body.event,
                ...staticEventData
            };

            req.body.context = {
                ...req.body.context,
                ...staticContextData
            };

            req.body.etype = {
                id_event: req.body.event.id,
                env: 'DIS',
                subenv: 'LNDSLD'
            };

            req.body.etype_subcategory = {
                id_event: req.body.event.id,
                category: 'GND',
                subcategory: 'LDS'
            };

            // Ver como vou resolver isso
            req.body.origin = {
                // id da organização
                // name
                //id_usuário
                // id do contexto
            };

            req.body.tso_2 = {
                id_event: req.body.event.id,
                id_context: req.body.context.id,
                id_contribution: req.body.id_contribution || null
            };
            //Fim das definições estáticas 

            if (req.files.length) {
                req.body.external_infos = req.files.map(file => ({
                    id_context: req.body.context.id,
                    uri: file.path,
                    type: EMSIController.getFileType(file.mimetype)
                }));

                if (req.body.desc_external_infos) {
                    for (const desc of req.body.desc_external_infos) {
                        if (req.body.external_infos[desc.index_file]) {
                            req.body.external_infos[desc.index_file].freetext = desc.freetext;
                        } else {
                            if (req.files.length) remFiles(req.files);
                            return res.status(400).send({ success: false, message: 'Descrição de arquivo enviada sem o arquivo correspondente!' });
                        }
                    }

                    delete req.body.desc_external_infos;
                }
            }

            if (req.body.egeo) {
                const addresses = await Nominatim.findAddressesByPosition(req.body.position);
                if (!addresses.success) {
                    if (req.files.length) remFiles(req.files);
                    return res.status(400).send(addresses.message);
                }

                req.body.addresses = addresses.addresses;
            }

            const result = await EMSI.create(req.body);
            if (result.success) {
                return res.send(result)
            } else {
                if (req.files.length) remFiles(req.files);
                return res.status(400).send(result);
            }
        });
    }
}

module.exports = EMSIController;
