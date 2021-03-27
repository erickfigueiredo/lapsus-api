const knex = require('../database/knex');
const Message = require('../utils/Message');

class Institution {
    async findOne(id) {
        try {
            const institution = knex.select('*')
                .from('instituition')
                .where({ id });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar a instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    async findByEmail(email) {
        try {
            const institution = knex.select('*')
                .from('instituition')
                .where({ email });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar a instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    async findAll(page) {
        try {
            const institutions = knex.select('*')
                .from('institution')
                .orderBy(['name', 'created_at'])
                .where({ "is_active": true })
                .paginate({
                    perPage: 20,
                    current: page
                });

            return institutions.data[0] ? { success: true, institutions } : { success: false, message: 'Não foi possível recuperar as instituições / Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    async create(data) {
        try {
            const institution = await knex.insert(data)
                .table('institution')
                .returning('id')
                .retuning('*');


            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível cadastrar a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir instituição!' };
        }
    }

    async update(data) {
        try {
            const id = data.id;

            delete data['id'];

            const institution = await knex.update(data)
                .table('institution')
                .where({ id })
                .returning('*');

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível atualiza a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar instituição!' };
        }
    }

    async delete(id) {
        try {
            const active = await knex.update({ 'is_active': false })
                .table('user')
                .where({ id, 'is_active': true })
                .returning('is_active');

            return active[0] ? { success: false, message: 'Instituição não deletada!' } : { message: true, message: 'Instituição deletada!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar instituição!' };
        }
    }
}

module.exports = Institution;
