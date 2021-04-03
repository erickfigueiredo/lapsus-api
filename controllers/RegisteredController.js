const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class RegisteredController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const registered = await User.findOneByType(id, 'R');
        return registered.success ? res.send(registered) : res.status(404).send(registered);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const registereds = await User.findAllByType('R', page);
        return registereds.success ? res.send(registereds) : res.status(404).send(registereds);
    }

    static async create(req, res) {
        const valid = UserValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const { name, surname, email, password, added_by } = req.body;

        const registered = { name, surname, email, password, added_by };

        const existEmail = await User.findByEmail(registered.email);
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });

        if (registered.added_by) {
            const existAdder = await User.findOneByType(registered.added_by, 'A');
            if (!existAdder.success)
                return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });
        } else delete registered['added_by'];


        const salt = bcrypt.genSaltSync(saltRounds);
        registered.password = bcrypt.hashSync(password, salt);

        registered.type = 'R';

        const result = await User.create(registered);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const { id, name, surname, email, password } = req.body;

        const form = { id, name, surname, email, password };

        const registered = await User.findOneByType(form.id, 'R');

        if (registered.success && registered.user.is_active) {
            const toUpdate = {};

            if (form.email && registered.user.email != form.email) {

                const existEmail = await User.findByEmail(form.email);
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });


                toUpdate.email = form.email;
            }

            if (form.name && registered.user.name != form.name) toUpdate.name = form.name;

            if (form.surname && registered.user.surname != form.surname) toUpdate.name = form.surname;

            if (form.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.password, salt);
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;
                toUpdate.type = 'R';


                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(registered);
        }
        return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const registered = await User.findOneByType(id, 'R');
        if (!(registered.success && registered.user.is_active))
            return res.status(404).send({ success: false, message: 'Usuário inexistente!' });


        const result = await User.delete(id, 'R');
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = RegisteredController;
