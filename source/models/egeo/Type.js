const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Type {
    static async listAll() {
        try {
            const type = await knex('egeo_type')
                .join('egeo_subtype', 'egeo_type.type', 'egeo_subtype.type')
                .select('egeo_type.type', 'egeo_type.desc as tp_desc', 'egeo_subtype.subtype', 'egeo_subtype.desc as subtp_desc')
                .orderBy('tp_desc', 'subtp_desc');

            const refactor = {};
            for (let i = 0; i < type.length; i++) {
                if (!refactor[type[i].type]) {

                    refactor[type[i].type] = {
                        desc: type[i].tp_desc,
                    };

                    refactor[type[i].type].subtype = [];
                }
                refactor[type[i].type].subtype.push({ subtype: type[i].subtype, desc: type[i].subtp_desc });
            }

            return type[0] ? { success: true, type:refactor } : { success: false, message: 'Opções de tipos inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a lista de tipos!' };
        }
    }
}

module.exports = Type;
