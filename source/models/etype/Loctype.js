const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Loctype {
    static async listAll() {
        try {
            const loctype = await knex('etype_loctype')
                .join('etype_subloctype', 'etype_loctype.loctype', 'etype_subloctype.loctype')
                .select(['etype_loctype.loctype', 'etype_loctype.desc as loc_desc',
                    'etype_subloctype.subloctype', 'etype_subloctype.desc as subloc_desc '])
                .orderBy('loc_desc', 'subloc_desc');

            const refactor = {}
            for (let i = 0; i < loctype.length; i++) {
                if (!refactor[loctype[i].loctype]) {

                    refactor[loctype[i].loctype] = {
                        desc: loctype[i].loc_desc,
                    };

                    refactor[loctype[i].loctype].subloctype = [];
                }
                refactor[loctype[i].loctype].subloctype.push({ subloctype: loctype[i].subloctype, desc: loctype[i].subloc_desc });
            }

            return loctype[0] ? { success: true, loctype: refactor } : { success: false, message: 'Opções de local inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os tipos de locais!' };
        }
    }
}

module.exports = Loctype;
