const knex = require('../database/knex');
const Message = require('../utils/Message');

class User {

    static async findOne(id) {
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

    static async findOneManager(id) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ id })
                .andWhere('type', '!=', 'R');

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o gerente / Gerente inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o gerente!' };
        }
    }

    static async findOneByType(id, type) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ id, type });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findByEmail(email) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ email })

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findAllByInstitution(idInstitution, page) {
        try {
            const user = await knex.select(['id', 'name', 'surname', 'email', 'created_at'])
                .from('user')
                .where({ 'id_institution': idInstitution, 'is_active': true })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page,
                    isLengthAware: true
                });

            return user.data[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    static async findAll(page) {
        try {
            const user = await knex
                .select('*')
                .from('user')
                .where({ 'is_active': true })
                .orderBy(['type', 'institution', 'name'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });


            return user.data[0] ? { sucess: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    static async findAllByType(type, page) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ type, 'is_active': true })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            console.log(user.data)


            return user.data[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async countByType(type) {
        try {
            const count = await knex('user').count('id').where({ type, 'is_active': true });

            return count[0].count;
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a contagem!' };
        }
    }

    static async create(data) {
        try {
            const user = await knex.insert(data)
                .table('user')
                .returning('*');


            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível cadastrar o usuário' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir usuário!' }
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const user = await knex.update(data)
                .table('user')
                .where({ id })
                .returning('*');

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível atualizar o usuário' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar usuário!' };
        }
    }

    static async delete(id, type) {
        try {
            const active = await knex.update({ is_active: false })
                .table('user')
                .where({ id, type, 'is_active': true })
                .returning('is_active');


            return active[0] ? { success: false, message: 'Usuário não deletado!' } : { success: true, message: 'Usuário deletado!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar usuário!' };
        }
    }
}

module.exports = User;
