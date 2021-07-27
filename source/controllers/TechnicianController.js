const User = require('../models/User');
const Institution = require('../models/Institution');
const UserValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class TechnicianController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const tech = await User.findOneByType(id, 'T');
        return tech.success ? res.send(admin) : res.status(404).send(tech);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const techs = await User.findAllByType('T', page);
        return tech.success ? res.send(techs) : res.status(404).send(techs);
    }

    static async create(req, res) {
        const valid = UserValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const tech = req.body;

        const existAdder = await User.findOneByType(tech.added_by, 'A');
        if (!existAdder.success) {
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });
        }

        const existInstitution = await Institution.findOne(tech.id_institution);
        if (!existInstitution.success) {
            return res.status(404).send({ success: false, message: 'Instituição inexistente!' });
        }

        const existEmail = await User.findByEmail(tech.email);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        tech.password = bcrypt.hashSync(tech.password, salt);

        tech.type = 'T';

        const result = await User.create(tech);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserValidator.updateValidate(true);
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const tech = await User.findOneByType(form.id, 'T');

        if (tech.success && tech.user.is_active) {
            const toUpdate = {};

            if (form.email && tech.user.email != form.email) {
                const existEmail = await User.findByEmail(form.email);
                if (existEmail.success) {
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
                }

                toUpdate.email = form.email;
            }

            if (form.id_institution && tech.user.id_institution != form.id_institution) {
                const existInstitution = await Institution.findOne(form.id_institution);
                if (!existInstitution.success) {
                    return res.status(404).send({ success: false, message: 'Instituição inexistente!' });
                }

                toUpdate.id_institution = form.id_institution;
            }

            if (form.name && admin.user.name != form.name) { toUpdate.name = form.name };

            if (form.surname && admin.user.surname != form.surname) { toUpdate.name = form.surname };

            if (form.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.password, salt);
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;
                toUpdate.type = 'A';

                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(admin);
        }
        return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async deactivate(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const tech = await User.findOneByType(id, 'T');
        if (!(tech.success && tech.user.is_active)) {
            return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
        }

        const result = await User.delete(id, 'T');
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = TechnicianController;
