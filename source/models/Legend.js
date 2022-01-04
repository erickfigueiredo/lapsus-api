const knex = require('../database/knex');
const Message = require('../utils/Message');

class Legend {
    static async findAll() {
        try {
            const legend = await knex.select('title', 'uri')
                .from('contribution_legend')
                .orderBy('title', 'asc');

            return legend[0] ? { success: true, legendItems: legend } : { success: false, message: 'Itens de legenda inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os itens da legenda!' };
        }
    }
};

module.exports = Legend;