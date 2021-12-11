const knex = require('../database/knex');
const Message = require('../utils/Message');

class EMSI {
    static async create(data) {
        try {
            return await knex.transaction(async trx => {
                await trx('event').insert(data.event);
                await trx('context').insert(data.context);

                await trx('etype').insert(data.etype);
                await trx('etype_has_etype_subcategory').insert(data.etype_subcategory);

                if (data.egeo) {
                    data.egeo.id_event = data.event.id;
                    const [id_egeo] = await trx('egeo').insert(data.egeo).returning('id');
                    
                    const [id_loc] = await trx('position').insert({ id_egeo, coord: data.position }).returning('id_loc');

                    for (const address of data.addresses) address.id_loc = id_loc;

                    await trx('address').insert(data.addresses);

                    console.log(id_egeo)


                    for (const weather of data.weathers) weather.id_egeo = id_egeo;

                    console.log(data.weathers)

                    await trx('egeo_has_egeo_subweather').insert(data.weathers);
                }

                if (data.loctypes) {
                    for (const loc of data.loctypes) loc.id_event = data.event.id;

                    await trx('etype_has_etype_subloctype').insert(data.loctypes);
                }

                if (data.actors) {
                    for (const actor of data.actors) actor.id_event = data.event.id;

                    await trx('etype_has_etype_actornv3').insert(data.actors);
                }

                if (data.evacs) {
                    for(const evac of data.evacs) evac.id_event = data.event.id;
                    
                    await trx('evac').insert(data.evacs);
                }
                
                if (data.casualties) {
                    for(const casualty of data.casualties) casualty.id_event = data.event.id;

                    await trx('casualties').insert(data.casualties);
                }

                if(data.external_infos) {
                    await trx('external_info').insert(data.external_infos);
                }
                
                await trx('origin').insert(data.origin);

                await trx('tso_2_0').insert(data.tso_2);

                return {success: true, message: 'Mensagem de emergência criada com sucesso!'};
            });

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao criar a mensagem de emergência!' };
        }
    }
}

module.exports = EMSI;
