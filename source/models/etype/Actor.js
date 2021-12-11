const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Actor {
    static async listAll() {
        try {
            const actor = await knex('etype_actor')
                .join('etype_actornv2', 'etype_actor.actor', 'etype_actornv2.actor')
                .join('etype_actornv3', function () {
                    this.on('etype_actor.actor', '=', 'etype_actornv3.actor')
                        .andOn('etype_actornv2.actornv2', '=', 'etype_actornv3.actornv2')
                })
                .select('etype_actor.actor', 'etype_actor.desc as act_desc', 'etype_actornv2.actornv2', 'etype_actornv2.desc as actnv2_desc', 'etype_actornv3.actornv3', 'etype_actornv3.desc as actnv3_desc')
                .orderBy('act_desc', 'actnv2_desc', 'actnv3_desc');
            
            const refactor = {};
            for (let i = 0; i < actor.length; i++) {
                if (!refactor[actor[i].actor]) {
                    refactor[actor[i].actor] = {
                        desc: actor[i].act_desc,
                    };

                    refactor[actor[i].actor].actornv2 = {};
                }

                if(!refactor[actor[i].actor].actornv2[actor[i].actornv2]) {
                    refactor[actor[i].actor].actornv2[actor[i].actornv2] = { 
                        desc: actor[i].actnv2_desc 
                    };
                    
                    refactor[actor[i].actor].actornv2[actor[i].actornv2].actornv3 = [];
                }
                
                refactor[actor[i].actor].actornv2[actor[i].actornv2].actornv3.push({ actornv3: actor[i].actornv3, desc: actor[i].actnv3_desc });
            }

            return actor[0] ? { success: true, actor: refactor } : { success: false, message: 'Opções de entidade inexistentes!' }
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a lista de entidades!' };
        }
    }

}

module.exports = Actor;
