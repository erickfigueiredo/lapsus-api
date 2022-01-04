const knex = require('../database/knex');
const Message = require('../utils/Message');

class OrgInformation {
    static async find() {
        try {
            const org = await knex.select(['name', 'uuid', 'was_updated'])
                .from('org_information')
                .where({ id: 1 });

            return org[0] ? { success: true, org: org[0] } : { success: false, message: 'Informações da Organização inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as informações da organização!' };
        }
    }

    static async update(data) {
        try {
            return knex.transaction(async trx => {
                const org = await trx.update(data)
                    .table('org_information')
                    .where({ id: 1 })
                    .returning(['name', 'uuid', 'was_updated']);

                await trx.update({ name: org[0].name, id_org: org[0].uuid }).table('origin');

                return { success: true, org: org[0] };
            });
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar as informações da organização!' };
        }
    }
};

module.exports = OrgInformation;
