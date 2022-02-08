const EMSI = require('../models/EMSI');
const User = require('../models/User');
const Nominatim = require('../models/Nominatim');

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

const OrgInformation = require('../models/OrgInformation');

const EMSIValidator = require('../validators/EMSIValidator');

const remFiles = require('../utils/RemoveFiles');
const reducer = require('../utils/ReduceObjArray');

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
        const category = await Category.findAll();
        const cause = await Cause.listAll();
        const casualties = await Casualties.listAll();
        const contribution = await Contribution.listAll();
        const loctype = await Loctype.listAll();
        const status = await Status.listAll();
        const type = await Type.listAll();
        const weather = await Weather.listAll();
        const scale = await Scale.listAll();
        const risk = await Risk.listAll();

        if (!actor.success) return res.status(404).send(actor);

        if (!category.success) return res.status(404).send(category);

        if (!cause.success) return res.status(404).send(cause);

        if (!casualties.success) return res.status(404).send(casualties);

        if (!contribution.success) return res.status(404).send(contribution);

        if (!loctype.success) return res.status(404).send(loctype);

        if (!status.success) return res.status(404).send(status);

        if (!type.success) return res.status(404).send(type);

        if (!weather.success) return res.status(404).send(weather);

        if (!scale.success) return res.status(404).send(scale);

        if (!risk.success) return res.status(404).send(risk);

        return res.send({
            success: true,
            actor: actor.actor,
            casualties: casualties.casualties,
            category: category.category,
            cause: cause.cause,
            contribution: contribution.contribution,
            loctype: loctype.loctype,
            risk: risk.risk,
            type: type.type,
            scale: scale.scale,
            status: status.status,
            weather: weather.weather
        });
    }

    static async create(req, res) {

        let qttAnnexes = parseInt(process.env.ANNEX_QUANTITY);
        if (isNaN(qttAnnexes)) qttAnnexes = 5;

        const fileProps = {
            allowedMimes: ['image/png', 'image/jpeg', 'application/vnd.oasis.opendocument.text', 'application/pdf', 'application/rtf', 'audio/mp3', 'video/mp4', 'text/xml',
                'application/msword', 'application/json'],
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

            const valid = EMSIValidator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                if (req.files.length) remFiles(req.files);

                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            const existManager = await User.findOneByType(req.locals.id, ['A', 'T', 'M']);
            if (!existManager.success) {
                if (req.files.length) remFiles(req.files);
                return res.status(404).send(existManager.message);
            }

            const existOrgInfo = await OrgInformation.find();
            if (!existOrgInfo.success || !existOrgInfo.org.was_updated) {
                if (req.files.length) remFiles(req.files);
                return existOrgInfo.success ?
                    res.status(409).send({ success: false, message: 'É necessário atualizar as informações sobre a organização!' })
                    : res.status(404).send(existOrgInfo.message);
            }

            // Propriedades estáticas que tornam o sistema especifico para deslizamentos de terra
            const staticEventData = {
                id: uuidV4(),
                source: 'HUMOBS',
                //obs_datime: new Date(),
            };

            const staticContextData = {
                id: uuidV4(),
                seclass: 'UNCLAS',
                mode: 'ACTUAL',
                msgtype: 'ALERT',
                level: 'STRTGC',
                //creation: new Date(),
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

            req.body.origin = {
                id_org: existOrgInfo.org.uuid,
                name: existOrgInfo.org.name,
                id_user: req.locals.id,
                id_context: req.body.context.id
            };

            req.body.tso_2 = {
                id_event: req.body.event.id,
                id_context: req.body.context.id,
                id_contribution: req.body.id_contribution || null
            };
            //Fim das definições estáticas 

            // Remoção de combinações duplicadas
            if (req.body.actors) {
                req.body.actors = reducer(req.body.actors);
            }

            if (req.body.weathers) {
                req.body.weathers = reducer(req.body.weathers);
            }

            if (req.body.loctypes) {
                req.body.loctypes = reducer(req.body.loctypes);
            }

            if (req.files.length) {
                req.body.external_infos = req.files.map(file => ({
                    id_context: req.body.context.id,
                    uri: `/annexes/${file.key}`,
                    path: file.path,
                    type: EMSIController.getFileType(file.mimetype)
                }));

                if (req.body.desc_external_infos) {
                    for (const desc of req.body.desc_external_infos) {
                        if (!!req.body.external_infos[desc.index_file]) {
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
                    return res.status(500).send(addresses.message);
                }

                req.body.addresses = addresses.addresses;
            }

            const result = await EMSI.create(req.body);
            if (result.success) {
                return res.status(201).send(result)
            } else {
                if (req.files.length) remFiles(req.files);
                return res.status(400).send(result);
            }
        });
    }
}

module.exports = EMSIController;
