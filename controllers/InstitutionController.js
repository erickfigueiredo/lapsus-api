const Institution = require('..models/Institution');
const InstitutionValidator = require('../validators/InstitutionValidator');

class InstitutionController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const institution = await Institution.findOne(id);
        return institution.success ? res.send(insititution) : res.status(404).send(registered);
    }

    static async index(req, res) {
        const page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const institutions = await Institution.findAll(page);
        return institutions.success ? res.send(institution) : res.status(404).send(institutions);
    }

    static async indexByAdder(req, res) {
        const id = req.params.id;

        if(isNaN(parseInt(id)))
            return res.status(400).send({success: false, message: 'Id inválido!'});
        
        // Verificar se o ADM existe
    }

    static async create(req, res) {
        const valid = InstitutionValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const existEmail = await Institution.findByEmail(req.email);
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });


        const result = await Institution.create(req.body);
        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = Institution.updateValidate();
        const {error} = valid.validate(req.body);

        if(error)
            return res.status(400).send({success: false, message: error.detaisl[0].message});

        
        const {id, name, address, email, phone} = req.body;

        const form = {id, name, address, email, phone};

        const institution = await Institution.findOne(form.id);
        if(register.success && register.institution.is_active) {
            const toUpdate = {};
            
            if(form.email && institution != form.email){
                const existEmail = await Institution.findByEmail(req.email);
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'E-mail já cadastrado!' });

                toUpdate.email = form.email;
            }
            
            if(form.name && institution.name != form.name) toUpdate.name = form.name;
            
            if(form.phone && institution.phone != form.phone) toUpdate.phone = form.phone;
            
            if(form.address && institution.address != form.address) toUpdate.address = form.address;
        
            if(Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Institution.update(toUpdate);
                return result.success ? res.send(result):res.status(400).send(result);
            }
            return res.send(institution);
        }
        return res.status(404).send({success: false, message: 'Instituição inexistente!'});
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const institution = await User.findOne(id);

        if (!(institution.success && institution.institution.is_active))
            return res.status(404).send({ success: false, message: 'Instituição inexistente!' });

        const result = await Institution.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = InstitutionController;
