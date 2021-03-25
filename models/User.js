const knex = require('../database/knex');
const Message = require('../utils/Message');

class User {

    static async findOneByType(id, type) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ id, type});

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

            return user[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }
    
    static async findByInstitution(idInstitution, page) {
        try {
            const user = await knex.select('*')
                .from('user')
                .where({ 'id_institution': idInstitution, 'is_active': true })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
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
            
                console.log(user.data.length);
            return user.data[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async create(data) {
        try {

            console.log(data)
            const type = data.type;

            const id = await knex.insert(data)
                .table('user')
                .returning('id');

            const user = await this.findOneByType(id[0], type);
            return user.success ? { success: true, user: user.user } : { success: false, message: 'Não foi possível cadastrar o usuário' };
        } catch (e) {
            Message.error(e);
            return { success: false, message: 'Falha ao inserir usuário!' }
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            const type = data.type;

            delete data['id'];

            await knex.update(data)
                .table('user')
                .where({ id });

            const user = await this.findOneByType(id, type);

            return { success: true, user: user.user };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Usuário não atualizado!' };
        }
    }

    static async delete(id, type) {
        try {
            await knex.update({ is_active: false })
                .table('user')
                .where({ id, type, 'is_active': true });

            return { success: true, message: 'Usuário deletado!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Usuário não deletado!' };
        }
    }
}

module.exports = User;
