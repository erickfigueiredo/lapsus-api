const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contact {
    static async findOne(id) {
        try {
            const contact = await knex.select('*')
                .from('contact')
                .where({ id });

            return contact[0] ? { success: true, contact: contact[0] } : { success: false, message: 'Mensagem inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a mensagem!' };
        }
    }

    static async findAll(page) {
        try {
            const contact = await knex.select('*')
                .from('contact')
                .orderBy(['is_visualized', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page,
                    isLengthAware: true
                });

            return contact.data[0] ? { success: true, contact } : { success: false, message: 'Mensagens inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as mensagens!' };
        }
    }

    static async create(data) {
        try {
            const contact = await knex.insert(data)
                .table('contact')
                .returning('*');

            return contact[0] ? { success: true, contact: contact[0] } : { success: false, message: 'Não foi possível cadastrar o mensagem!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir mensagem!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const contact = await knex.update(data)
                .table('contact')
                .where({ id })
                .returning('*');

            return contact[0] ? { success: true, contact: contact[0] } : { success: false, message: 'Não foi possível atualizar a mensagem!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar a mensagem!' };
        }
    }

    static async delete(id) {
        try {
            await knex('contact')
                .where({ id })
                .del();

            return { success: true, message: 'Mensagem deletada com sucesso!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar mensagem!' };
        }
    }
}

module.exports = Contact;
