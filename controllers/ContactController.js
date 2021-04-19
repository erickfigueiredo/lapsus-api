const Contact = require('../models/Contact');
const ContactValidator = require('../validators/ContactValidator');

class ContactController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const cnt = await Contact.findOne(id);
        return cnt.success ? res.send(cnt) : res.status(404).send(cnt);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const cnts = Contact.findAll(page);
        return cnts.success ? res.send(cnts) : res.status(404).send(cnts);
    }

    static async create(req, res) {
        const valid = ContactValidator.createValidate();
        const {error} = valid.validate(req.body);

        if(error)
            return res.status(400).send({success: false, message: error.details[0].message});


        const result = await Contact.create(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async toggleVisualize(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const existMessage = await Contact.findOne(id);
        if(!existMessage.success)
            return res.status(404).send(existMessage);


        const is_visualized = !existMessage.contact.is_visualized ;

        const result = Contact.update({id, is_visualized});
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const existMessage = await Contact.findOne(id);
        if (!existMessage.success)
            return res.status(404).send(existMessage);

        
        const result = Contact.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = ContactController;
