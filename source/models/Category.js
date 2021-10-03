const knex = require('../database/knex');
const Message = require('../utils/Message');

class Category {
    static async findOne(id) {
        try {
            const category = await knex.select(['id', 'name', 'desc'])
                .from('category')
                .where({ id });

            return category[0] ? { success: true, category: category[0] } : { success: false, message: 'Não foi possível recuperar a categoria / Categoria inexistente!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar a categoria!' };
        }
    }

    static async findByName(name) {
        try {
            const category = await knex.select(['id', 'name', 'desc'])
                .from('category')
                .where({ name });

            return category[0] ? { success: true, category: category[0] } :
                { success: false, message: 'Não foi possível recuperar a categoria / Categoria inexistente!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar a categoria!' };
        }
    }

    static async findAll() {
        try {
            const category = await knex.select(['id', 'name', 'desc'])
                .from('category')
                .orderBy('name');

            return category[0] ? { success: true, category } : { success: false, message: 'Não foi possível recuperar as categorias / Categorias inexistentes!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar as categorias!' };
        }
    }

    static async create(data) {
        try {
            const category = await knex.insert(data)
                .table('category')
                .returning(['id', 'name', 'desc']);

            return category[0] ? { success: true, category: category[0] } : { success: false, message: 'Não foi possível cadastrar a categoria!' };
        } catch (e) {
            Message.warning(e);
            
            return { success: false, message: 'Falha ao inserir categoria!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const category = await knex.update(data)
                .table('category')
                .where({ id })
                .returning(['id', 'name', 'desc']);

            return category[0] ? { success: true, category: category[0] } : { success: false, message: 'Não foi possível atualizar a categoria!' };
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Falha ao atualizar categoria!' };
        }
    }

    static async delete(id) {
        try {
            await knex('category')
                .where({ id })
                .del();

            const existCategory = await this.findOne(id);

            return existCategory.success ? { success: false, message: 'Não foi possível deletar a categoria!' } : { success: true, message: 'Categoria deletada com successo!' };
        } catch (e) {
            Message.warning(e);

            if (e.toString().indexOf('violates foreign key constraint') !== -1) {
                
                return { success: false, message: 'Não é possível deletar esse dado, pois existem informações associadas!' };
            }

            return { success: false, message: 'Falha ao deletar categoria!' };
        }
    }
}

module.exports = Category;
