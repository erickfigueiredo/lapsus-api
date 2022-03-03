const knex = require('../database/knex');
const Mail = require('./Mail');

const Message = require('../utils/Message');

class Token {

    static async findOne(token) {
        try {
            const resetToken = await knex.select(['token', 'id_user'])
                .from('reset_token')
                .where({ token, accessed: false })
                .andWhere(function () {
                    this.whereRaw('EXTRACT(EPOCH FROM (NOW() - created_at)) <= 86400');
                });

            return resetToken[0] ? { success: true, token_data: resetToken[0] } : { success: false, message: 'Token inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o token de redefinição de senha' };
        }
    }

    static async create(user, token, ip, org) {
        try {
            return await knex.transaction(async trx => {
                await trx.insert({ token, id_user: user.id }).table('reset_token');

                const send = await Mail.recoverPassword(user, token, ip, org);
                if (!send.success) {
                    throw new Error(send.message);
                }

                return { success: true, message: 'Você receberá um um e-mail caso a informação pertença a um usuário ativo!' };
            });

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha durante a emissão e envio de token!' };
        }
    }

    static async updatePassword(id_user, token, password) {
        try {
            return await knex.transaction(async trx => {
                await trx.update({ accessed: true })
                    .table('reset_token')
                    .where({ token, id_user });

                await trx.update({ password })
                    .table('user')
                    .where({ id: id_user });

                return { success: true, message: 'Senha atualizada com sucesso!' };
            });
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao atualizar a senha usando o token!' };
        }
    }

    static async delete() {
        try {
            await knex('reset_token')
                .where({ accessed: false })
                .andWhere(function () {
                    this.whereRaw('EXTRACT(EPOCH FROM (NOW() - created_at)) > 86400');
                })
                .del();

            return { success: true, message: 'Tokens deletados com sucesso!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao deletar tokens vencidos' };
        }
    }
}

module.exports = Token;
