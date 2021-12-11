const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Cause {
    static async listAll() {
        try {
            const cause = await knex.select('cause', 'desc')
            .from('event_cause')
            .orderBy('desc');

            return cause[0] ? {success: true, cause} : {success: false, message: 'Opções de causa inexistentes!'};
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar a listagem de causas!' };
        }
    }
}

module.exports = Cause;
