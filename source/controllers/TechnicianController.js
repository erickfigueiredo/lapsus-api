const User = require('../models/User');
const Institution = require('../models/Institution');
const UserManagingValidator = require('../validators/UserManagingValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class TechnicianController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const tech = await User.findOneByType(id, 'T');
        return tech.success ? res.send(tech) : res.status(404).send(tech);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const filters = {};
        if (req.query.search) {
            filters.search = req.query.search;
        }

        if (!isNaN(parseInt(req.query.id_institution))) {
            filters.id_institution = parseInt(req.query.id_institution);
        }

        if (req.query.order && (['asc', 'desc'].includes(req.query.order))) {
            filters.order = req.query.order;
        }

        if (req.query.who && (['both', 'active', 'inactive'].includes(req.query.who))) {
            filters.who = req.query.who;
        }

        const tech = await User.findAllByType('T', page, filters);
        return tech.success ? res.send(tech) : res.status(404).send(tech);
    }

    static async indexByInstitution(req, res) {
        const idInstitution = req.params.id_institution;

        if (isNaN(parseInt(idInstitution))) {
            return res.status(400).send({ success: false, message: 'Id de instituição Inválido' });
        }

        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const techs = await User.findAllByInstitution(idInstitution, page);
        return techs.success ? res.send(techs) : res.status(404).send(techs);
    }

    static async create(req, res) {
        const valid = UserManagingValidator.createValidate('T');
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const tech = req.body;
        const existEmail = await User.findByEmail(tech.email, false);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        tech.added_by = req.locals.id;

        const existAdder = await User.findOneByType(tech.added_by, 'A');
        if (!existAdder.success) {
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });
        }

        const existInstitution = await Institution.findOne(tech.id_institution);
        if (!existInstitution.success) {
            return res.status(404).send({ success: false, message: 'Instituição inexistente!' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        tech.password = bcrypt.hashSync(tech.password, salt);

        tech.type = 'T';

        const result = await User.create(tech);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserManagingValidator.updateValidate('T');
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const tech = await User.findOneByType(form.id, 'T');
        if (tech.success) {
            const toUpdate = {};

            if (form.email && tech.user.email !== form.email) {

                const existEmail = await User.findByEmail(form.email, false);
                if (existEmail.success){
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
                }

                toUpdate.email = form.email;
            }

            if (form.id_institution && tech.user.id_institution !== form.id_institution) {

                const existInstitution = await Institution.findOne(form.id_institution);
                if (!existInstitution.success){
                    return res.status(404).send({ success: false, message: 'Instituição inexistente!' });
                }

                toUpdate.id_institution = form.id_institution;
            }

            if (form.name && tech.user.name !== form.name) toUpdate.name = form.name;

            if (form.surname && tech.user.surname !== form.surname) toUpdate.surname = form.surname;

            if (form.type && tech.user.type !== form.type) toUpdate.type = form.type;

            if (form.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.password, salt);
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(tech);
        }
        return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async toggleStatus(req, res) {
        const valid = UserManagingValidator.toggleValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const id = req.body.id;

        const tech = await User.findOneByType(id, 'T', false);
        if (!tech.success)
            return res.status(404).send(tech.message);

        const is_active = !tech.user.is_active;
        const result = await User.update({ id, is_active });
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = TechnicianController;
