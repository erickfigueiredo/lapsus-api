const User = require('../models/User');


const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class TechnicianController {
    static async show(req, res) {
        const id = req.params.id;

        if(isNaN(parseInt(id)))
            return res.status(400).send({success: false, message: 'Id inválido!'});

        const tech = await User.findOneByType(id, 'T');
        return tech.success? res.send(admin):res.status(404).send(tech);
    }

    static async index(req, res) {
        let page = req.query.page;

        if(isNaN(parseInt(page))) page = 1;

        const techs = await User.findAllByType('T', page);
        return tech.success ? res.send(techs) : res.status(404).send(techs);
    }

    static async create(req, res) {
        const valid = TechnicianValidator.createValidate();
        const {error} = valid.validate(req.body);

        if(error)
            return res.status(400).send({success:false, message: error.details[0].message});

        const {name, surname, email, password, id_institution}
    }
}

module.exports = TechnicianController;
