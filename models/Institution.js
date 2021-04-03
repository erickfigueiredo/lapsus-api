const knex = require('../database/knex');
const Message = require('../utils/Message');

class Institution {
    static async findOne(id) {
        try {
            const inst = await knex.select('*')
                .from('institution')
                .where({ id });

            return inst[0] ? { success: true, institution: inst[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findAll(page) {
        try {
            const inst = await knex.select('*')
                .from('institution')
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return inst.data[0] ? { success: true, institution: inst } : { success: false, message: 'Não foi possível recuperar as instituições / Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    static async findByEmail(email) {
        try {
            const inst = await knex.select('*')
                .from('institution')
                .where({ email });

            return inst[0] ? { success: true, institution: inst[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findByPhone(phone) {
        try {
            const inst = await knex.select('*')
                .from('institution')
                .where({ phone });

            return inst[0] ? { success: true, institution: inst[0] } : { success: false, message: 'Não foi possível recuperar o instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async create(data) {
        try {
            const inst = await knex.insert(data)
                .table('institution')
                .returning('*');


            return inst[0] ? { success: true, instituition: inst[0] } : { success: false, message: 'Não foi possível cadastrar a instituição' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir instituição!' }
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const inst = await knex.update(data)
                .table('instituition')
                .where({ id })
                .returning('*');

            return inst[0] ? { success: true, instituition: inst[0] } : { success: false, message: 'Não foi possível atualizar a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar instituição!' };
        }
    }
}

module.exports = Institution;
