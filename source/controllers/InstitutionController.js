const Institution = require('../models/Institution');
const User = require('../models/User');
const InstitutionValidator = require('../validators/InstitutionValidator');

class InstitutionController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const form = await Institution.findOne(id);
        return form.success ? res.send(form) : res.status(404).send(form);
    }

    static async index(req, res) {
        const result = await Institution.findAll();
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async indexDetailed(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1; }

        const result = await Institution.findAllDetailed(page);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async create(req, res) {
        const valid = InstitutionValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        form.state = form.state.toUpperCase();

        if (!['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RO', 'RR', 'RJ',
            'RN', 'RS', 'SC', 'SP', 'SE', 'TO'].includes(form.state)) {
            return res.status(404).send({ success: false, message: 'O estado informado não existe!' });
        }

        form.number = form.number.toUpperCase();

        const existAdder = await User.findOneByType(req.locals.id, 'A');
        if (!existAdder.success) {
            return res.status(404).send({ success: false, message: 'Usuário administrador inexistente!' });
        }

        const existEmail = await Institution.findByEmail(form.email);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        const existPhone = await Institution.findByPhone(form.phone);
        if (existPhone.success) {
            return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });
        }

        form.added_by = req.locals.id;

        const result = await Institution.create(form);
        return result.success ? res.status(201).send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = InstitutionValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const existInst = await Institution.findOne(form.id);
        if (existInst.success) {
            const toUpdate = {};

            if (form.state) {
                form.state = form.state.toUpperCase();

                if (!['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RO', 'RR', 'RJ',
                    'RN', 'RS', 'SC', 'SP', 'SE', 'TO'].includes(form.state)) {
                    return res.status(404).send({ success: false, message: 'O estado informado não existe!' });
                }

                if (existInst.institution.state !== form.state) toUpdate.street = form.street;
            }

            if (form.email && existInst.institution.email !== form.email) {
                const existEmail = await Institution.findByEmail(form.email);
                if (existEmail.success) {
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
                }

                toUpdate.email = form.email;
            }

            if (form.phone && existInst.institution.phone !== form.phone) {
                const existPhone = await Institution.findByPhone(form.phone);
                if (existPhone.success) {
                    return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });
                }

                toUpdate.phone = form.phone;
            }

            if (form.name && existInst.institution.name !== form.name) { toUpdate.name = form.name; }

            if (form.street && existInst.institution.street !== form.street) { toUpdate.street = form.street; }

            if (form.neighborhood && existInst.institution.neighborhood !== form.neighborhood) { toUpdate.neighborhood = form.neighborhood; }

            if (form.number) {
                form.number = form.number.toUpperCase();

                if (existInst.institution.number !== form.number) toUpdate.number = form.number;
            }

            if (form.zipcode && existInst.institution.zipcode !== form.zipcode) { toUpdate.zipcode = form.zipcode; }

            if (form.city && existInst.institution.city !== form.city) { toUpdate.city = form.city; }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Institution.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(existInst);
        }
        return res.status(404).send(existInst);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if(isNaN(parseInt(id))) {
            return res.status(400).send({success: false, message: 'Id inválido!'});
        }

        const existInst = await Institution.findOne(id);
        if(!existInst.success) {
            return res.status(404).send(existInst);
        }

        const result  =await Institution.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = InstitutionController;
