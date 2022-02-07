const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class UserController {
    static async show(req, res) {
        const id = req.locals.id;

        const result = await User.findOne(id);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async userTypeRelationship(req, res) {
        const result = await User.getUserTypeRelationship();
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async usersByMonth(req, res) {
        const result = await User.getUsersByMonth();
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async create(req, res) {
        const valid = UserValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const registered = req.body;

        const existEmail = await User.findByEmail(registered.email, false);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        registered.password = bcrypt.hashSync(registered.password, salt);

        registered.type = 'R';

        const result = await User.create(registered);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;

        const existUser = await User.findOne(form.id);
        if (existUser.success) {
            const toUpdate = {};

            if (form.password && form.password !== form.new_password) {
                const isCorrect = bcrypt.compareSync(form.password, existUser.user.password);

                if (!isCorrect) {
                    return res.status(409).send({ success: false, message: 'Senha incorreta!' });
                }

                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.new_password, salt);
            }

            if (form.name && form.name !== existUser.user.name) toUpdate.name = form.name;

            if (form.surname && form.surname !== existUser.user.surname) toUpdate.surname = form.surname;

            if (form.email && form.email !== existUser.user.email) {
                const existEmail = await User.findByEmail(form.email, false);
                if (existEmail.success) {
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' })
                }

                toUpdate.email = form.email;
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(existUser);
        }
        return res.status(404).send(existUser);
    }

    static async deactivate(req, res) {
        const valid = UserValidator.deactivateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existUser = await User.findOneByType(req.body.id, req.locals.type);
        if (existUser.success) {
            if (existUser.user.type === 'A') {
                const count = parseInt(await User.countByType('A'));

                if (count === 1) {
                    return res.status(409).send({ success: false, message: 'O sistema precisa possuir ao menos um Administrador!' });
                }
            }
            const result = await User.deactivate(req.body.id, req.locals.type);
            return result.success ? res.send(result) : res.status(400).send(result);
        }
        return res.status(404).send(existUser);
    }
}

module.exports = UserController;

