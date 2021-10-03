const knex = require('../database/knex');
const Message = require('../utils/Message');

class Institution {
    static async findOne(id) {
        try {
            const institution = await knex.select('*')
                .from('institution')
                .where({ id });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findAll(page) {
        try {
            const institution = await knex.select(['id', 'name'])
                .from('institution')
                .orderBy(['name', 'created_at']);

            return institution[0] ? { success: true, institution } : { success: false, message: 'Não foi possível recuperar as instituições / Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    static async findAllDetailed(page) {
        try {
            const institution = await knex.select(['institution.id', 'institution.name', 'institution.email', 'institution.created_at'])
                .count('user.id', {as: 'amount_users'})
                .from('institution')
                .leftJoin('user','institution.id', 'user.id_institution')
                .orderBy(['name', 'created_at'])
                .groupBy('institution.id')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return institution.data[0] ? { success: true, institution } : { success: false, message: 'Não foi possível recuperar as instituições / Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    static async findByEmail(email) {
        try {
            const institution = await knex.select('*')
                .from('institution')
                .where({ email });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findByPhone(phone) {
        try {
            const institution = await knex.select('*')
                .from('institution')
                .where({ phone });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async create(data) {
        try {
            const institution = await knex.insert(data)
                .table('institution')
                .returning('*');

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível cadastrar a instituição' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir instituição!' }
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const institution = await knex.update(data)
                .table('institution')
                .where({ id })
                .returning('*');

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível atualizar a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar instituição!' };
        }
    }
}

module.exports = Institution;
