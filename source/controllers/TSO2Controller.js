const TSO2 = require('../models/TSO2');
const TSO2Validator = require('../validators/TSO2Validator');
const TesteValidator = require('../validators/TesteValidator');

const { v4: uuidV4 } = require('uuid');

const multer = require('multer');
const multerConfig = require('../config/Multer');

class TSO2Controller {
    static async index(req, res) {

    }

    static async findOne(req, res) {

    }
    /**
     * === INFORMAÇÕES GERAIS ===
     * Tipo de Evento
     * momento da Identificação
     * momento da Ocorrência
     * Probabilidade de Ocorrência
     * Urgência (Urgente <-> Não Urgente)
     * status
     * risco
     * causa
     * recursos
     * 
     * tipo de local do incidente (pode ter mais de 1)
     *      -> Local -> SubLocal
     * 
     * Entidades em Perigo (pode ter mais de 1)
     *      -> Entidade 1 -> Entidade 2 -> Entidade 3
     * 
     * === ÁREA DE ANEXOS ===
     * Anexos (Pode ter n)
     * 
     * === EVACUAÇÃO ===
     * pessoas evacuadas (pode ter mais de 1)
     *      data e hora da evacuação
     *      Número de evacuados
     *      Numero de evacuados no momento
     * 
     * === Inf. Adicional ===
     * Data e Hora
     * Tipo de Área Selecionada
     * 
     * tempo (pode ter mais de 1)
     *      tempo -> subtempo
     *
     * Descrição
     * Associar a uma contribuição
     */

    static async create(req, res) {
        const fileProps = { allowedMimes: ['image/png', 'image/jpeg', 'audio/mpeg', 'video/mp4'], numFiles: 5 };

        const upload = multer(multerConfig('annexes', fileProps)).array('file', 5);
        upload(req, res, async (fail) => {

            if (fail instanceof multer.MulterError) {
                console.log(fail)
                return res.status(400).send({ success: false, message: 'Os arquivos não atendem aos requisitos necessários!' });
            }

            const valid = TSO2Validator.createValidate();
            const { error } = valid.validate(req.body);

            if (error) {
                // Deleta os arquivos se houve upload
                // Interessante mudar para UUID

                return res.status(400).send({ success: false, message: error.details[0].message });
            }

            // Se deu tudo certo com a validação, verificamos a existencia das informações no banco de dados;
            


            console.log(req.files)
        });
    }
}

module.exports = TSO2Controller;

/*

let a = {
    Freetext: '', // Freetext vem de category e vai pra context

    obs_datime: '', // Quando é registrado no sistema
    ocorrencia_time: '',
    declaration_time: '',

    certainty: '', //0 a 100

    urgency: '',

    event_status: '',
    event_risk: '',
    event_cause: '',
    event_scale: '',
    loctypes: [
        { loctype: '', subloctype: '' },
        { loctype: '', subloctype: '' }
    ],
    actors: [
        { actor: '', actornv2: '', actornv3: '' },
        { actor: '', actornv2: '', actornv3: '' }
    ],
    Freetext: '', //Freetext vai pra Event

    annexes: [
        { uuid: '' },
        { uuid: '' }
    ],

    victims: [
        { casualtie_context: '', dataEHora: '', extremaUrgencia: '', urgencia: '', feridas: '', obito: '', desaparecidos: '' },
    ],

    evac: [
        { dataEHora: '', numEvacuados: '', numEvacNoMomento: '' },
        { dataEHora: '', numEvacuados: '', numEvacNoMomento: '' }
    ],

    egeo: [
        { egeoType: '', egeoSubtype: '' },
        { egeoType: '', egeoSubtype: '' }
    ],

    weather: [
        { weather: '', subweather: '' }
    ],

    freetext: '',

    contrib_assoc: '',

    added_by: '',
    position: ''
}
*/
