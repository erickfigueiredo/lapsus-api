const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class EgeoStatus {
    static async listAll() {
        try {
            const status = await knex.select('status', 'desc')
            .from('egeo_status')
            .orderBy('desc');

            return status[0] ? {success: true, status} : {success: false, message: 'Opções de status inexistentes!'};
        } catch(e) {
            Message.warning(e);

            return {success: false, message: 'Houve um erro ao recuperar a listagem de status!'};
        }
    }
}

module.exports = EgeoStatus;