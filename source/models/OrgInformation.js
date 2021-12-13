const knex = require('../database/knex');
const Message = require('../utils/Message');

class OrgInformation {
    static async find() {
        try {
            const org = await knex.select('*')
                .from('org_information')
                .where({id: 1});

            return org[0] ? { success: true, org: org[0] } : { success: false, message: 'Informações da Organização inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as informações da organização!' };
        }
    }

    static async update(data) {
        try {
            const org = await knex.update(data)
                .table('org_information')
                .where({id: 1})
                .returning('*');

            return org[0] ? { success: true, org: org[0] } : { success: false, message: 'Não foi possível atualizar as informações da organização!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao atualizar as informações da organização!' };
        }
    }
};

module.exports = OrgInformation;
