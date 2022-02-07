const User = require('../models/User');
const UserManagingValidator = require('../validators/UserValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class AdminController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const admin = await User.findOneByType(id, 'A');
        return admin.success ? res.send(admin) : res.status(404).send(admin);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) { page = 1 };

        const filters = {};
        if(req.query.search) {
            filters.search = req.query.search;
        }

        if(req.query.order && (['asc', 'desc'].includes(req.query.order))) {
            filters.order = req.query.order;
        }

        if(req.query.who && (['both', 'active', 'inactive'].includes(req.query.who))) {
            filters.who = req.query.who;
        }

        const admin = await User.findAllByType('A', page, filters);
        return admin.success ? res.send(admin) : res.status(404).send(admin);
    }

    static async create(req, res) {
        const valid = UserManagingValidator.createValidate('A');
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const admin = req.body;
        const existEmail = await User.findByEmail(admin.email, false);
        if (existEmail.success) {
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
        }

        admin.added_by = req.locals.id;

        const existAdder = await User.findOneByType(admin.added_by, 'A');
        if (!existAdder.success) {
            return res.status(404).send({ success: false, message: 'Usuário adicionador inexistente!' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        admin.password = bcrypt.hashSync(admin.password, salt);

        admin.type = 'A';

        const result = await User.create(admin);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = AdminController;
