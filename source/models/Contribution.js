const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contribution {
    static async findOne(id) {
        try {
            const ctb = await knex.select('*')
                .from('category')
                .where({ id });

            if (ctg[0]) {
                const annex = await knex.select('uri')
                    .from('annex')
                    .where({ id_contribution: id });

                ctb[0].annex = annex;

                return { success: true, contribution: ctb[0] };
            }

            return { success: false, message: 'Houve um erro ao recuperar a contribuição / Contribuição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a contribuição!' };
        }
    }

    static async findAll(page) {
        try {
            const ctb = await knex.select('*')
                .from('contribution')
                .orderBy('published')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return ctb.data[0] ? { success: true, contribution: ctb } : { success: false, message: 'Não foi possível recuperar as contribuições / Contribuições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as contribuições!' };
        }
    }

    static async create(data, files = null) {
        try {
            if (files) {
                return await knex.transaction(async trx => {
                    const ctb = await trx('contribution').insert(data, '*');

                    const id_contribution = ctb[0].id;

                    for (file of files) {
                        const f = await trx('annex').insert({ uri: file.uri, id_contribution }, 'uri');

                        ctb[0].annexes.push(f);
                    }

                    return { success: true, contribution: ctb[0] };
                })
            } else {
                const ctb = await knex.insert(data)
                    .table('contribution')
                    .returning('*');

                return ctb[0] ? { success: true, contribution: ctb[0] } : { success: false, message: 'Não foi possível cadastrar a contribuição!' };
            }
        } catch (e) {
            for (file of files)
                fs.unlinkSync(`${file.path}`);

            Message.warning(e);
            return {success: false, message: 'Falha ao inserir contribuição!'}
        }
    }

    static async update() {
        try {

        } catch (e) {

        }

    }

    static async delete() {
        try {

        } catch (e) {

        }
    }
}

module.exports = Contribution;
