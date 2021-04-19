const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contact {
    static async findOne(id) {
        try {
            const cnt = await knex.select('*')
                .from('contact')
                .where({ id });

            return cnt[0] ? { success: true, contact: cnt[0] } : { success: false, message: 'Não foi possível recuperar a mensagem / Mensagem inexistente!' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Houve um erro ao recuperar a mensagem!' };
        }
    }

    static async findAll(page) {
        try {
            const cnt = await knex.select('*')
                .from('contact')
                .orderBy(['is_visualized', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return cnt.data[0] ? { success: true, contact: cnt } : { success: false, message: 'Não foi possível recuperar as mensagens / Mensagens inexistentes!' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Houve um erro ao recuperar as mensagens!' };
        }
    }

    static async create(data) {
        try {
            const cnt = await knex.insert(data)
                .table('contact')
                .returning('*');

            return cnt[0] ? { success: true, contact: cnt[0] } : { success: false, message: 'Não foi possível cadastrar o mensagem!' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir mensagem!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const cnt = await knex.update(data)
                .table('contact')
                .where({ id })
                .returning('*');

            return cnt[0] ? { success: true, contact: cnt[0] } : { success: false, message: 'Não foi possível atualizar a mensagem!' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao atualizar a mensagem!' };
        }
    }

    static async delete(id) {
        try {
            await knex('contact')
                .where({ id })
                .del();

            existContact = await this.findOne(id);

            existContact.success ? { success: false, message: 'Houve um erro ao deletar a mensagem!' } : { success: true, message: 'Mensagem deletada com sucesso!' };

        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao deletar mensagem!' };
        }
    }
}

module.exports = Contact;
