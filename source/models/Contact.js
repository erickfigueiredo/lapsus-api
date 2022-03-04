const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contact {
    static async findOne(id) {
        try {
            const contact = await knex.select('id', 'sender', 'subject', 'email', 'body', 'is_visualized', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"),
            knex.raw("to_char(updated_at, 'DD/MM/YYYY') as updated_at"))
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
            const contact = await knex.select('id', 'sender', 'subject', 'email', 'body', 'is_visualized', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"),
            knex.raw("to_char(updated_at, 'DD/MM/YYYY') as updated_at"))
                .from('contact')
                .orderBy(['is_visualized', 'created_at'])
                .paginate({
                    perPage: 25,
                    currentPage: page,
                    isLengthAware: true
                });

            return contact.data[0] ? { success: true, contact } : { success: false, message: 'Mensagens inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as mensagens!' };
        }
    }

    static async getReadRelationship() {
        try {
            const contact = await knex.raw('SELECT is_visualized AS read, COUNT(id) AS amount FROM contact GROUP BY is_visualized');

            return contact.rows[0] ? { success: true, contact: contact.rows } : { success: false, message: 'Mensagens inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a relação de mensagens lidas!' };
        }
    }

    static async create(data) {
        try {
            const contact = await knex.insert(data)
                .table('contact')
                .returning(['id', 'sender', 'subject', 'email', 'body', 'is_visualized', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"),
                knex.raw("to_char(updated_at, 'DD/MM/YYYY') as updated_at")]);

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
                .returning(['id', 'sender', 'subject', 'email', 'body', 'is_visualized', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"),
                knex.raw("to_char(updated_at, 'DD/MM/YYYY') as updated_at")]);

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
