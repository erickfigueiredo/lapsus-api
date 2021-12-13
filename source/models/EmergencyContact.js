const knex = require('../database/knex');
const Message = require('../utils/Message');

class EmergencyContact {

    static async findOne(id) {
        try {
            const emContact = await knex.select(['id', 'name', 'phone'])
                .from('emergency_contact')
                .where({ id });

            return emContact[0] ? { success: true, emContact } : { success: false, message: 'Contato de emergência inexistente!' }
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar o contato de emergência!' }
        }
    }

    static async listAll() {
        try {
            const emContact = await knex.select(['id', 'name', 'phone'])
                .from('emergency_contact')
                .orderBy('name');

            return emContact[0] ? { success: true, emContact } : { success: false, message: 'Contatos de emergência inexistentes!' }
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar os contatos de emergência!' }
        }
    }

    static async create(data) {
        try {
            const emContact = await knex.insert(data)
                .table('emergency_contact')
                .returning(['id', 'name', 'phone']);

            return emContact[0] ? { success: true, emContact: emContact[0] } : { success: false, message: 'Não foi possível cadastrar o contato de emergência!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Falha ao inserri o contato de emergência!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const emContact = await knex.update(data)
                .table('emergency_contact')
                .where({ id })
                .returning(['id', 'name', 'phone']);

            return emContact[0] ? { success: true, emContact: emContact[0] } : { success: false, message: 'Não foi possível atualizar o contato de emergência!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Falha ao atualizar o contato de emergência!' };
        }
    }

    static async delete(id) {
        try {
            await knex('emergency_contact')
                .where({ id })
                .del();

            return { success: true, message: 'Contato de emergência deletado com sucesso!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Falha ao deletar contato de emergência!' };
        }
    }
}

module.exports = EmergencyContact;
