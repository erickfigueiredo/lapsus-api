const knex = require('../database/knex');
const Message = require('../utils/Message');

const fs = require('fs');
const path = require('path');

class Shapefile {
    static async findOne(id) {
        try {
            const shp = await knex.select('*')
                .from('shapefile')
                .where({ id });

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Não foi possível recuperar o shapefile / Shapefile inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o shapefile!' };
        }
    }

    static async findByTitle(title) {
        try {
            const shp = await knex.select('*')
                .from('shapefile')
                .where({ title });

            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Não foi possível recuperar o shapefile / Shapefile inexistente!' };

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o shapefile!' };
        }
    }

    static async findAll(page) {
        try {
            const shp = await knex.select('*')
                .from('shapefile')
                .orderBy('created_at', 'DESC')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return shp.data[0] ? { success: true, shapefile: shp } : { success: false, message: 'Houve um erro ao recuperar os shapefiles / Shapefiles inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os shapefiles!' };
        }
    }

    static async create(data) {
        try {
            const shp = await knex.insert(data)
                .table('shapefile')
                .returning('*');


            return shp[0] ? { success: true, shapefile: shp[0] } : { success: false, message: 'Não foi possível recuperar o shapefile / Shapefile inexistente!' };
        } catch (e) {
            // Remove pastas e sub-pastas de forma recursiva e síncrona 
            fs.rmdirSync(path.resolve(__dirname, '..', '..', 'shapefiles', data.uri), { recursive: true });

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
                .where({id})
                .returning('*');

            return shp[0] ? {success: true, shapefile: shp[0]}: {success: false, message: 'Não foi possível atualizar o shapefile!'};
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar shapefile!' };
        }
    }

    static async delete(id, uri) {
        try {
            await knex('shapefile')
                .where({ id })
                .del();

            const existShp = await this.findOne(id);
            if (existShp.success)
                return { success: true, message: 'Houve um erro ao deletar o Shapefile!' };


            fs.rmdirSync(path.resolve(__dirname, '..', '..', 'shapefiles', uri), { recursive: true });

            return { success: true, message: 'Shapefile deletado com sucesso!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar shapefile!' };
        }
    }
}

module.exports = Shapefile;
