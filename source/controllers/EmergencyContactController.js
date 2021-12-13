const EmergencyContact = require('../models/EmergencyContact');
const EmergencyContactValidator = require('../validators/EmergencyContactValidator');

class EmergencyContactController {
    static async index(req, res) {
        const emCtt = await EmergencyContact.listAll();

        return emCtt.success ? res.send(emCtt) : res.status(404).send(emCtt);
    }

    static async create(req, res) {
        const valid = EmergencyContactValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const result = await EmergencyContact.create(req.body);
        return result.success ? res.status(201).send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid = EmergencyContactValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const form = req.body;
        const existEmCtt = await EmergencyContact.findOne(form.id);

        if (existEmCtt.success) {
            const toUpdate = {};

            if (form.name && form.name !== existEmCtt.emContact.name) toUpdate.name = form.name;

            if (form.phone && form.phone !== existEmCtt.emContact.phone) toUpdate.phone = form.phone;

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;
                const result = await EmergencyContact.update(toUpdate);

                return result.success ? res.send(result) : res.status(400).send(result);
            }

            return res.send(existEmCtt);
        }

        return res.status(404).send(existEmCtt);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        const existEmCtt = await EmergencyContact.findOne(id);

        if (!existEmCtt.success) {
            return res.status(404).send(existEmCtt);
        }

        const result = await EmergencyContact.delete(id);

        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = EmergencyContactController;
