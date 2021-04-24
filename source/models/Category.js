const knex = require('../database/knex');
const Message = require('../utils/Message');

class Category {
    static async findOne(id) {
        try {
            const ctg = await knex.select('*')
                .from('category')
                .where({ id });

            return ctg[0] ? { success: true, category: ctg[0] } : { success: false, message: 'Houve um erro ao recuperar a categoria / Categoria inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a categoria!' };
        }
    }

    static async findByName(name) {
        try {
            const ctg = await knex.select('*')
                .from('category')
                .where({ name });

            return ctg[0] ? { success: true, category: ctg[0] } : { success: false, message: 'Houve um erro ao recuperar a categoria / Categoria inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a categoria!' };
        }
    }

    static async findAll(page) {
        try {
            const ctg = await knex.select('*')
                .from('category')
                .orderBy(['name', 'created_at'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return ctg.data[0] ? { success: true, category: ctg } : { success: false, message: 'Não foi possível recuperar as categorias / Categorias inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as categorias!' };
        }
    }

    static async create(data) {
        try {
            const ctg = await knex.insert(data)
                .table('category')
                .returning('*');

            return ctg[0] ? { success: true, category: ctg[0] } : { success: false, message: 'Não foi possível cadastrar a categoria!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir categoria!' };
        }

    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const ctg = await knex.update(data)
            .table('category')
            .where({id})
            .returning('*');

            return ctg[0] ? {success: true, category: ctg[0]} : {success: false, message: 'Não foi possível atualizar a categoria!'};
        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }

    }

    static async delete(id) {
        try {
            await knex('category')
            .where({id})
            .del();

            const existCategory = await this.findOne(id);

            return existCategory.success ? {success: false, message: 'Houve um erro ao deletar a categoria!'}:{success: true, message: 'Categoria deletada com successo!'};
        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }
    }
}

module.exports = Category;
