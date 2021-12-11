const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Casualties {
    static async listAll() {
        try {
            const casualties = await knex.select('context', 'desc')
                .from('casualties_context')
                .orderBy('desc');

            return casualties[0] ? { success: true, casualties } : { success: false, message: 'Opções de contexto de vítimas inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a listagem de contexto de vítimas!' };
        }
    }
}

module.exports = Casualties;
