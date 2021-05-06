const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class AdminController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const admin = await User.findOneByType(id, 'A');
        return admin.success ? res.send(admin) : res.status(404).send(admin);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const admins = await User.findAllByType('A', page);
        return admins.success ? res.send(admins) : res.status(404).send(admins);
    }

    static async create(req, res) {
        const valid = UserValidator.createValidate('A');
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const admin = req.body;

        const existEmail = await User.findByEmail(admin.email);
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });

            
        const existAdder = await User.findOneByType(admin.added_by, 'A');
        if (!existAdder.success)
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });


        const salt = bcrypt.genSaltSync(saltRounds);
        admin.password = bcrypt.hashSync(admin.password, salt);

        admin.type = 'A';

        const result = await User.create(admin);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = UserValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const form = req.body;

        const admin = await User.findOneByType(form.id, 'A');

        if (admin.success && admin.user.is_active) {
            const toUpdate = {};

            if (form.email && admin.user.email != form.email) {
                const existEmail = await User.findByEmail(form.email);
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });


                toUpdate.email = form.email;
            }

            if (form.name && admin.user.name != form.name) toUpdate.name = form.name;

            if (form.surname && admin.user.surname != form.surname) toUpdate.surname = form.surname;

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

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const admin = await User.findOneByType(id, 'A');
        if (!(admin.success && admin.user.is_active))
            return res.status(404).send({ success: false, message: 'Usuário inexistente!' });


        const count = await User.countByType('A');
        if (count == 1)
            return res.status(409).send({ success: false, message: 'O sistema precisa possuir ao menos um Administrador!' });


        const result = await User.delete(id, 'A');
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = AdminController;
