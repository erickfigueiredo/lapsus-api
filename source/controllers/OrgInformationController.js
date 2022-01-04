const OrgInformation = require('../models/OrgInformation');
const OrgInformationValidator = require('../validators/OrgInformationValidator');

class OrgInformationController {
    static async show(req, res) {
        const org = await OrgInformation.find();
        return org.success ? res.send(org) : res.status(404).send(org);
    }

    static async update(req, res) {
        const valid = OrgInformationValidator.updateValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existOrg = await OrgInformation.find();
        
        if (existOrg.success) {
            const form = req.body;
            
            const toUpdate = {};

            if (form.name && existOrg.org.name !== form.name) {
                toUpdate.name = form.name;
            }

            if (form.uuid && existOrg.org.uuid !== form.uuid) {
                toUpdate.uuid = form.uuid;
            }

            if (Object.keys(toUpdate).length) {
                if (toUpdate.name && toUpdate.uuid && !existOrg.org.was_updated) toUpdate.was_updated = true;

                const result = await OrgInformation.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }

            return res.send(existOrg);
        }

        return res.status(404).send(existOrg);
    }
};

module.exports = OrgInformationController;
