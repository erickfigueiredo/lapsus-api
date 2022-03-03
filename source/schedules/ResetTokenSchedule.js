const cron = require('node-cron');
const Message = require('../utils/Message');
const ResetToken = require('../models/ResetToken');

module.exports = () => {
    // Tarefa roda todo dia primeiro
    cron.schedule('0 0 1 * *', async () => {
        Message.info('- Início da rotina de deleção de tokens -');
        const result = await ResetToken.delete();
        if (!result.success) {
            Message.warning(result.message);
        }
        Message.info('- Fim da rotina de deleção de tokens -');
    });
};
