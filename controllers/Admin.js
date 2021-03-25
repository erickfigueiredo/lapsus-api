const User = require('../models/User');
const AdminValidator = require('../validators/AdminValidator');

class AdminController {
    static async show(req, res) {
        const id = req.params.id;
        
        if (isNaN(parseInt(id))) {
            res.status(400).send({ success: false, message: 'Id inválido!' });
            return;
        }
        
        const admin = await User.findOneByType(id, 'A');
        admin.success ? res.send(admin) : res.status(404).send(admin);
    }
    
    static async index(req, res) {
        let page = req.query.page;
        
        if (isNaN(parseInt(page))) page = 1;
        
        const admins = await User.findAllByType('A', page);
        admins.success ? res.send(admins) : res.status(404).send(admins);
    }
    
    // Tudo okay
    static async create(req, res) {
        const valid = AdminValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            res.status(400).send({ success: false, message: error.details[0].message });
            return;
        }

        const existAdminAdder = await User.findByType(req.body.added_by);
        if(!existAdminAdder.success || !Object.keys(existAdminAdder.user).length) {
            res.status(409).send({success: false, message: 'Administrador adicinador não existe!'});
            return;
        }

        //

        const existEmail = await User.findByEmail(req.body.email);
        if (existEmail.success && Object.keys(existEmail.user).length) {
            res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
            return;
        }

        const result = await User.create(req.body);
        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = AdminValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            res.status(400).send({ success: false, message: error.details[0].message });
            return;
        }

        const { id, name, surname, email, password, type } = req.body;

        const form = {
            id,
            name,
            surname,
            email,
            password,
            type
        };

        const admin = await User.findOneByType(form.id, 'A');

        if (admin.success && Object.keys(admin.user).length) {
            const toUpdate = {};

            if (form.name && admin.user.name != form.name) toUpdate.name = form.name;

            if (form.surname && admin.user.surname != form.surname) toUpdate.surname = form.surname;

            if (form.email && admin.user.email != form.email) {
                const existEmail = await User.findByEmail(form.email);
                if (existEmail.success && Object.keys(existEmail.user).length) {
                    res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });
                    return;
                }

                toUpdate.email = form.email;
            }

            if (form.password) toUpdate.password = form.password;


            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await User.update(toUpdate);
                result.success ? res.send(result) : res.status(400).send(result);
                return;
            }
            res.send({ success: true, admin });
        }
        res.status(404).send({ success: false, message: 'Administrador inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            res.status(400).send({ success: false, message: 'Id inválido!' });
            return;
        }

        const admin = await User.findOneByType(id, 'A');
        if (!admin.success || (admin.success && !Object.keys(admin.user).length) || (admin.success && Object.keys(admin.user).length && !admin.user.is_active)) {
            res.status(404).send({ success: false, message: 'Administrador inexistente!' });
            return;
        }

        const result = await User.delete(id, 'A');
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = AdminController;
