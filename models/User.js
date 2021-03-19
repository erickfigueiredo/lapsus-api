const knex = require('../database/knex');
const Message = require('../utils/Message');

class User {
    async findOne(id) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ id });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    async findByEmail(email) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ email });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    async findByInstitution(idInstitution, page) {
        try {

            const user = await knex.select('*')
                .from('user')
                .where({ "id_institution": idInstitution })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return user[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário' };
        }
    }

    async findByType(type, page) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ type })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return user[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário' };
        }
    }

    async findAll(page) {
        try {
            const user = await knex
                .select('*')
                .from('user')
                .orderBy(['type', 'institution', 'name'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return user[0] ? { sucess: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    async create(data) {
        try {
            const id = await knex.insert(data)
                .table('user')
                .returning('id');

            const user = await this.findOne(id[0]);

            return user.success ? { success: true, user: user.user } : { success: false, message: 'Não foi possível cadastrar o usuário' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir usuário!' }
        }
    }

    async update(data) {
        try {
            const id = data.id;

            delete data['id'];

            await knex.update(data)
                .table('user')
                .where({ id });

            const user = await this.findOne(id);

            return { success: true, user };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Usuário não atualizado' };
        }
    }

    async delete(id) {
        try {
            await knex.update({ is_active: false })
                .table('user')
                .where({ id, "is_active": true });

            return { success: true, message: 'Usuário deletado!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Usuário não deletado!' };
        }
    }
}

module.exports = User;
