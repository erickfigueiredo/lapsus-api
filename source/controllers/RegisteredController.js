const User = require('../models/User');
const UserManagingValidator = require('../validators/UserManagingValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class RegisteredController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const registered = await User.findOneByType(id, 'R');
        return registered.success ? res.send(registered) : res.status(404).send(registered);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const filters = {};
        if (req.query.search) {
            filters.search = req.query.search;
        }

        if (req.query.order && (['asc', 'desc'].includes(req.query.order))) {
            filters.order = req.query.order;
        }

        if (req.query.who && (['both', 'active', 'inactive'].includes(req.query.who))) {
            filters.who = req.query.who;
        }

        const registered = await User.findAllByType('R', page, filters);
        return registered.success ? res.send(registered) : res.status(404).send(registered);
    }

    static async create(req, res) {
        const valid = UserManagingValidator.createValidate('R');
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const registered = req.body;
        const existEmail = await User.findByEmail(registered.email, false);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        registered.added_by = req.locals.id;

        const existAdder = await User.findOneByType(registered.added_by, 'A');
        if (!existAdder.success) {
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        registered.password = bcrypt.hashSync(registered.password, salt);

        registered.type = 'R';

        const result = await User.create(registered);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserManagingValidator.updateValidate('R');
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const registered = await User.findOneByType(form.id, 'R');
        if (registered.success) {
            const toUpdate = {};

            if (form.email && registered.user.email !== form.email) {

                const existEmail = await User.findByEmail(form.email, false);
                if (existEmail.success){
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
                }

                toUpdate.email = form.email;
            }

            if (form.name && registered.user.name !== form.name) toUpdate.name = form.name;

            if (form.surname && registered.user.surname !== form.surname) toUpdate.surname = form.surname;

            if (form.type && registered.user.type !== form.type) toUpdate.type = form.type;

            if (form.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.password, salt);
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(registered);
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

        const registered = await User.findOneByType(id, 'R', false);
        if (!registered.success)
            return res.status(404).send(registered);

        const is_active = !registered.user.is_active;
        const result = await User.update({ id, is_active });
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = RegisteredController;
