const Institution = require('../models/Institution');
const User = require('../models/User');
const InstitutionValidator = require('../validators/InstitutionValidator');

class InstitutionController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const inst = await Institution.findOne(id);
        return inst.success ? res.send(inst) : res.status(404).send(inst);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const insts = await Institution.findAll(page);
        return insts.success ? res.send(insts) : res.status(404).send(insts);
    }

    static async create(req, res) {
        const valid = InstitutionValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const inst = req.body;

        const existEmail = await Institution.findByEmail(inst.email);
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });

        const existPhone = await Institution.findByPhone(inst.phone);
        if (existPhone.success)
            return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });

        const existAdder = await User.findOneByType(inst.added_by, 'A');
        if (!existAdder.success)
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });

        const result = await Institution.create(inst);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = InstitutionValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const form = req.body;
        const inst = await Institution.findOne(form.id);

        if (inst.success) {
            const toUpdate = {};

            if (form.email && inst.institution.email != form.email) {
                const existEmail = await Institution.findByEmail(form.email);
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });


                toUpdate.email = form.email;
            }

            if (form.phone && inst.institution.phone != form.phone) {
                const existPhone = await Institution.findByPhone(form.phone);
                if (existPhone.success)
                    return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });


                toUpdate.phone = form.phone;
            }

            if (form.name && inst.institution.name != form.name) toUpdate.name = form.name;

            if (form.address && inst.institution.address != form.address) toUpdate.address = form.address;

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Institution.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(inst);
        }
        return res.status(404).send({ success: false, message: 'Instituição inexistente!' });
    }
}

module.exports = InstitutionController;
