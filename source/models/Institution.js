const knex = require('../database/knex');
const Message = require('../utils/Message');

class Institution {
    static async findOne(id) {
        try {
            const institution = await knex.select('id', 'name', 'email', 'phone', 'street', 'neighborhood', 'zipcode', 'state', 'city', 'number', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"))
                .from('institution')
                .where({ id });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findAll() {
        try {
            const institution = await knex.select('id', 'name')
                .from('institution')
                .orderBy(['name', 'created_at']);

            return institution[0] ? { success: true, institution } : { success: false, message: 'Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    static async findAllDetailed(page) {
        try {
            const institution = await knex.select('id', 'name', 'email', 'phone', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"))
                .from('institution')
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 25,
                    currentPage: page,
                    isLengthAware: true
                });

            return institution.data[0] ? { success: true, institution } : { success: false, message: 'Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    static async findByEmail(email) {
        try {
            const institution = await knex.select('id', 'name', 'email', 'phone', 'street', 'neighborhood', 'zipcode', 'state', 'city', 'number', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"))
                .from('institution')
                .where({ email });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async findByPhone(phone) {
        try {
            const institution = await knex.select('id', 'name', 'email', 'phone', 'street', 'neighborhood', 'zipcode', 'state', 'city', 'number', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"))
                .from('institution')
                .where({ phone });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    static async getInstitutionsAmount() {
        try {
            const result = await knex('institution').count('id');

            return result[0].count ? { success: true, amount: result[0].count } : { success: false, message: 'Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a quantidade de Instituições!' };
        }
    }

    static async create(data) {
        try {
            const institution = await knex.insert(data)
                .table('institution')
                .returning(['id', 'name', 'email', 'phone', 'street', 'neighborhood', 'zipcode', 'state', 'city', 'number', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at")]);

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
                .returning(['id', 'name', 'email', 'phone', 'street', 'neighborhood', 'zipcode', 'state', 'city', 'number', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at")]);

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível atualizar a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar instituição!' };
        }
    }
    static async delete(id) {
        try {

            await knex('institution')
                .where({ id })
                .del();

            return { success: true, message: 'Instituição deletada com sucesso!' };
        } catch (e) {
            Message.warning(id);

            if (e.toString().indexOf('violates foreign key constraint')) {
                return { success: false, message: 'Não é possível deletar a instituição, pois existem usuários associados!' };
            }

            return { success: false, message: 'Falha ao deletar instituição!' };
        }
    }
}

module.exports = Institution;
