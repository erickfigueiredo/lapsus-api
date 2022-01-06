const knex = require('../database/knex');
const Message = require('../utils/Message');

class Shapefile {
    static async findOne(id) {
        try {
            const shp = await knex.select('id', 'title', 'desc', 'uri', 'path')
                .from('shapefile')
                .where({ id });

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Shapefile inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o shapefile!' };
        }
    }

    static async findByTitle(title) {
        try {
            const shp = await knex.select('id', 'title', 'desc')
                .from('shapefile')
                .where({ title });

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Shapefile inexistente!' };

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o shapefile!' };
        }
    }

    static async findAll(method) {
        try {
            let attr = ['id', 'title', 'desc'];

            if (method === 'y') attr = 'uri';

            const shp = await knex.select(attr)
                .from('shapefile')
                .orderBy('created_at', 'DESC');

            return shp[0] ? { success: true, shapefile: shp } : { success: false, message: 'Shapefiles inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os shapefiles!' };
        }
    }

    static async create(data) {
        try {
            const shp = await knex.insert(data)
                .table('shapefile')
                .returning(['id', 'title', 'desc']);

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Não foi possível adicionar o shapefile!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir shapefile!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const shp = await knex.update(data)
                .table('shapefile')
                .where({ id })
                .returning(['id', 'title', 'desc']);

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Não foi possível atualizar o shapefile!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar shapefile!' };
        }
    }

    static async delete(id) {
        try {
            await knex('shapefile')
                .where({ id })
                .del();

            return { success: true, message: 'Shapefile deletado com sucesso!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar shapefile!' };
        }
    }
}

module.exports = Shapefile;
