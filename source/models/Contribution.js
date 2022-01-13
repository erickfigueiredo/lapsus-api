const knex = require('../database/knex');
const Message = require('../utils/Message');

class Contribution {
    
    static async findOne(id) {

        try {
            const contrib = await knex.select('c.id', 'c.created_at', 'c.updated_at', 'occurrence', 'victims', 'risk_damage', 'published',
            'c.desc', knex.raw('st_asText(local) as local'), 'cat.name as category_name', 'coll.name as collaborator_name', 'coll.surname as collaborator_surname',
            'mng.name as manager_name', 'mng.surname as manager_surname')
            .from('contribution as c')
            .join('category as cat', 'cat.id', 'c.id_category')
            .leftJoin('user as coll', 'id_collaborator', 'coll.id')
            .leftJoin('user as mng', 'id_manager', 'mng.id')
            .where({'c.id': id});

            if (contrib[0]) {
                const annex = await knex.select('id', 'uri')
                    .from('annex')
                    .where({ id_contribution: id });

                if (annex[0]) { contrib[0].annexes = annex; }

                return { success: true, contribution: contrib[0] };
            }

            return { success: false, message: 'Contribuição inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a contribuição!' };
        }
    }

    static async findAll(page) {

        try {
            const contrib = await knex.select('c.id', 'c.created_at', 'c.updated_at', 'occurrence', 'victims', 'risk_damage', 'published',
                'c.desc', knex.raw('st_asText(local) as local'), 'cat.name as category_name', 'coll.name as collaborator_name', 'coll.surname as collaborator_surname',
                'mng.name as manager_name', 'mng.surname as manager_surname')
                .from('contribution as c')
                .join('category as cat', 'cat.id', 'c.id_category')
                .leftJoin('user as coll', 'id_collaborator', 'coll.id')
                .leftJoin('user as mng', 'id_manager', 'mng.id')
                .orderByRaw("published='P' DESC, created_at ASC")
                .paginate({
                    perPage: 25,
                    currentPage: page,
                    isLengthAware: true
                });

            for (const c of contrib.data) {
                c.annexes = await knex.select('id', 'uri').from('annex').where({ id_contribution: c.id });
            }

            return contrib.data[0]? { success: true, contribution: contrib } : { success: false, message: 'Contribuições inexistentes!' };;
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as contribuições' };
        }
    }

    static async listAll() {

        try {
            const contrib = await knex.select('contribution.id as id', 'name as category')
                .from('contribution')
                .join('category', 'contribution.id_category', 'category.id')
                .orderBy('id')
                .where({ published: 'A' });

            return { success: true, contribution: contrib };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as contribuições!' };
        }
    }

    static async create(data, files = null) {

        try {
            return await knex.transaction(async trx => {
                const [id_contribution] = await trx('contribution').insert(data).returning('id');

                if (files) {
                    for (const file of files) {
                        file.id_contribution = id_contribution;
                    }

                    await trx('annex').insert(files);
                }

                return { success: true, message: 'Contribuição cadastrada com sucesso!' };
            });

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao cadastrar contribuição!' };
        }
    }

    static async update(data) {

        try {
            const id = data.id;
            delete data['id'];

            await knex.update(data)
                .table('contribution')
                .where({ id });

            const contrib = await Contribution.findOne(id);
            return contrib;
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar a contribuição!' };
        }
    }
}

module.exports = Contribution;
