const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Scale {
    static async listAll() {
        try {
            const scale = await knex.select('scale', 'desc')
            .from('event_scale')
            .orderBy('desc');

            return scale[0] ? {success: true, scale} : {success: false, message: 'Opções de recursos inexistentes!'};
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a listagem de recursos!' };
        }
    }
}

module.exports = Scale;