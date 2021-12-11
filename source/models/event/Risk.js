const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Risk {
    static async listAll() {
        try {
            const risk = await knex.select('risk_assessmnt', 'desc')
            .from('event_risk_assessmnt')
            .orderBy('desc');

            return risk[0] ? {success: true, risk} : {success: false, message: 'Opções de risco inexistentes!'};
        } catch (e) {
            Message.warning(e);

            return { success: false, message: 'Houve um erro ao recuperar a listagem de riscos!' };
        }
    }
}

module.exports = Risk;