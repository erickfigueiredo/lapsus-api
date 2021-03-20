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

    async findByAdmAdder(idAdm) {
        try {
            const institution = knex.select('*')
                .from('instituition')
                .where({ "id_adm": idAdm });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar a instituição / Instituição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a instituição!' };
        }
    }

    async findAll(page) {
        try {
            const institution = knex.select('*')
                .from('institution')
                .orderBy(['name', 'created_at'])
                .where({ "is_active": true })
                .paginate({
                    perPage: 20,
                    current: page
                });

            return institution[0] ? { success: true, institution: institution[0] } : { success: false, message: 'Não foi possível recuperar as instituições / Instituições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as instituições!' };
        }
    }

    async create(data) {
        try {
            const id = await knex.insert(data)
                .table('institution')
                .returning('id');

            const institution = await this.findOne(id[0]);

            return institution.success ? { success: true, institution: institution.institution } : { success: false, message: 'Não foi possível cadastrar a instituição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir instituição!' };
        }
    }

    async update(data) {
        try {
            const id = data.id;

            delete data['id'];

            await knex.update(data)
                .table('institution')
                .where({ id });

            const institution = await this.findOne(id);

            return { success: true, institution };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Instituição não atualizada!' };
        }
    }

    async delete(id) {
        try {

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Instituição não deletada!' };
        }
    }
}

module.exports = Institution;
