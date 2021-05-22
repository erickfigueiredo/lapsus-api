const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class ModeratorController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const moderator = await User.findOneByType(id, 'M');
        return moderator.success ? res.send(moderator) : res.status(404).send(moderator);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const moderators = await User.findAllByType('M', page);
        return moderators.success ? res.send(moderators) : res.status(404).send(moderators);
    }

    static async create(req, res) {
        const valid = UserValidator.createValidate('M');
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const moderator = req.body;

        const existAdder = await User.findOneByType(moderator.added_by, 'A');
        if(!existAdder.success)
            return res.status(404).send({success: false, message: 'Usuário adicionador inexistente! '});

        const existEmail = await User.findByEmail(moderator.email);
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        moderator.password = bcrypt.hashSync(moderator.password, salt);

        moderator.type = 'M';

        const result = await User.create(moderator);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const form = req.body;

        const moderator = await User.findOneByType(form.id, 'M');

        if (moderator.success && moderator.user.is_active) {
            const toUpdate = {};

            if (form.email && moderator.user.email != form.email) {

                const existEmail = await User.findByEmail(form.email);
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });


                toUpdate.email = form.email;
            }

            if (form.name && moderator.user.name != form.name) toUpdate.name = form.name;

            if (form.surname && moderator.user.surname != form.surname) toUpdate.surname = form.surname;

            if (form.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                toUpdate.password = bcrypt.hashSync(form.password, salt);
            }

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;
                toUpdate.type = 'M';


                const result = await User.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(moderator);
        }
        return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const moderator = await User.findOneByType(id, 'M');
        if (!(moderator.success && moderator.user.is_active))
            return res.status(404).send({ success: false, message: 'Usuário inexistente!' });


        const result = await User.delete(id, 'M');
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = ModeratorController;
