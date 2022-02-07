const knex = require('../database/knex');
const Message = require('../utils/Message');

class User {

    static async findOne(id) {
        try {
            const user = await knex.select('id', 'name', 'surname', 'email', 'type', 'id_institution')
                .from('user')
                .where({ id, is_active: true });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findOneByType(id, type, ignoreInactive = true) {
        try {
            const user = await knex.select('id', 'name', 'surname', 'email', 'type', 'id_institution', 'is_active')
                .from('user')
                .where({ id })
                .andWhere(function () {
                    if (ignoreInactive) {
                        this.where({ is_active: true });
                    }
                })
                .andWhere(function () {
                    if (type.length) {
                        this.where({ type: type[0] });

                        for (let i = 1; i < type.length; i++)
                            this.orWhere({ type: type[i] });
                    } else {
                        this.where({ type });
                    }
                });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findByEmail(email, ignoreInactive = true) {
        try {
            const user = await knex.select('id', 'name', 'surname', 'email', 'password', 'type', 'id_institution')
                .from('user')
                .where(function () {
                    this.where({ email });

                    if (ignoreInactive) {
                        this.andWhere({ is_active: true });
                    }
                });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Usuário inexistente!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findAllByInstitution(idInstitution, page) {
        try {
            const user = await knex.select('id', 'name', 'surname', 'email', 'created_at')
                .from('user')
                .where({ 'id_institution': idInstitution, 'is_active': true })
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 25,
                    currentPage: page,
                    isLengthAware: true
                });

            return user.data[0] ? { success: true, user } : { success: false, message: 'Usuários inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    static async findAllByType(type, page, filters) {
        try {
            const user = await knex.select('id', 'name', 'surname', 'type', 'email', 'id_institution', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"), 'is_active')
                .from('user')
                .where({ type })
                .andWhere(function () {
                    if (filters.search) {
                        this.andWhereRaw(`
                            unaccent(name) ilike unaccent(:search) or
                            unaccent(surname) ilike unaccent(:search) or
                            unaccent(email) ilike unaccent(:search) or
                            unaccent(to_char(created_at, 'DD/MM/YYYY')) ilike unaccent(:search)
                        `, {
                            search: `%${filters.search}%`
                        });
                    }
                })
                .andWhere(function () {
                    if (filters.who && filters.who !== 'both') {
                        if (filters.who === 'active') this.where({ is_active: true });
                        else this.where({ is_active: false });
                    }
                })
                .andWhere(function () {
                    if (filters.id_institution) {
                        this.where({ id_institution: filters.id_institution });
                    }
                })
                .orderBy([
                    { column: 'name', order: filters.order || 'asc' },
                    { column: 'surname', order: filters.order || 'asc' },
                    'created_at'
                ])
                .paginate({
                    perPage: 30,
                    currentPage: page,
                    isLengthAware: true
                });

            return user.data[0] ? { success: true, user } : { success: false, message: 'Usuários inexistentes!' }
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

    static async getUserTypeRelationship() {
        try {
            const user = await knex.raw('SELECT type, COUNT(type) AS amount FROM user GROUP BY type');

            return user.rows[0] ? { success: true, user: user.rows } : { success: false, message: 'Usuários inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a qauntidade por tipo de usuário!' };
        }
    }

    static async getUsersByMonth() {
        try {
            const user = await knex.raw(`SELECT date_part('month', created_at) AS month, COUNT(created_at) as users 
            FROM user GROUP BY month, DATE_TRUNC('year', created_at) ORDER BY month DESC LIMIT 12`);

            return user.rows[0] ? { success: true, user: user.rows } : { success: false, message: 'Usuários inexistentes!' };
        } catch (e) {
            MessageEvent.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a relação mensal de novos usuários!' };
        }
    }

    static async create(data) {
        try {
            const user = await knex.insert(data)
                .table('user')
                .returning(['id', 'name', 'surname', 'type', 'email', 'id_institution', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"), 'is_active']);

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
                .returning(['id', 'name', 'surname', 'type', 'email', 'id_institution', knex.raw("to_char(created_at, 'DD/MM/YYYY') as created_at"), 'is_active']);

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível atualizar o usuário' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar usuário!' };
        }
    }

    static async deactivate(id, type) {
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
