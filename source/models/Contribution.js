const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contribution {
    static async findOne(id) {
        try {
            const contrib = await knex.select('*')
                .from('contribution')
                .where({ id });

            if (contrib[0]) {
                const annex = await knex.select('uri')
                    .from('annex')
                    .where({ id_contribution: id });


                if (annex[0]) { contrib[0].annex = annex; }

                return { success: true, contribution: contrib[0] };
            }

            return { success: false, message: 'Não foi possível recuperar a contribuição / Contribuição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a contribuição!' };
        }
    }

    static async findAll(page) {
        try {
            const contrib = await knex.select('*')
                .from('contribution')
                .orderBy('published')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return contrib.data[0] ? { success: true, contribution: contrib } : { success: false, message: 'Não foi possível recuperar as contribuições / Contribuições inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as contribuições!' };
        }
    }

    static async create(data, files = null) {
        try {
            if (files) {
                return await knex.transaction(async trx => {
                    const contrib = await trx('contribution').insert(data, '*');

                    const id_contribution = contrib[0].id;

                    contrib[0].annexes = [];

                    // Insert array knex (verificar)
                    for (const file of files) {
                        const f = await trx('annex').insert({
                            uri: file.uri,
                            id_contribution
                        }, 'uri');

                        contrib[0].annexes.push(f);
                    }

                    return { success: true, contribution: contrib[0] };
                });
            } else {
                const contrib = await knex.insert(data)
                    .table('contribution')
                    .returning('*');

                return contrib[0] ? { success: true, contribution: contrib[0] } : { success: false, message: 'Não foi possível cadastrar a contribuição!' };
            }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao inserir contribuição!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const contrib = await knex.update(data)
                .table('contribution')
                .where({ id })
                .returning('*');

            return contrib[0] ? { success: true, contribution: contrib[0] } : { success: false, message: 'Não foi possível atualizar a contribuição!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar a contribuição!' };
        }
    }
}

module.exports = Contribution;
