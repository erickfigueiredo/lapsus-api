const knex = require('../database/knex');
const Message = require('../utils/Message');

class EMSI {
    static async findAll(center, degrees) {
        try {
            const emsi = await knex.raw(
                `
                SELECT 

                    ori.name AS origin_name, ori.id_org AS origin_id,
                    
                    ev.certainty AS event_certainty, ev.freetext AS event_freetext, ev_src.desc AS event_source, ev_sc.desc AS event_scale, 
                    ev_sts.desc AS event_status, ev_cau.desc AS event_cause, ev_rsk.desc AS event_risk, to_char(ev.created_at, 'DD/MM/YYYY') AS obs_datime, 
                    to_char(ev.occ_datime, 'DD/MM/YYYY') AS occ_datime, to_char(ev.decl_datime, 'DD/MM/YYYY') AS decl_datime,
                    
                    ctx.freetext AS context_freetext, ctx.urgency AS context_urgency, ctx_se.desc AS context_seclass, ctx_md.desc AS context_mode, ctx_lvl.desc AS
                    ctx_level, ctx_msg.desc AS context_msgtype,
                    
                    adr.address, ST_ASTEXT(pos.coord) AS coord,
                    
                    eg.freetext AS egeo_freetext, eg_tp.desc AS egeo_type, eg_sbtp.desc AS egeo_subtype,
                    
                    et_ev.desc AS etype_env, et_sbev.desc AS etype_subenv
                    
                FROM tso_2_0 tso
                    
                    LEFT JOIN  event ev ON tso.id_event = ev.id
                    LEFT JOIN event_scale ev_sc ON ev_sc.scale = ev.scale
                    LEFT JOIN event_source ev_src ON ev_src.source = ev.source
                    LEFT JOIN event_status ev_sts ON ev_sts.status = ev.status
                    LEFT JOIN event_cause ev_cau ON ev_cau.cause = ev.cause
                    LEFT JOIN event_risk_assessmnt ev_rsk ON ev_rsk.risk_assessmnt = ev.risk_assessmnt
                    
                    LEFT JOIN context ctx ON tso.id_context = ctx.id
                    LEFT JOIN context_seclass ctx_se ON ctx_se.seclass = ctx.seclass
                    LEFT JOIN context_mode ctx_md ON ctx_md.mode = ctx.mode
                    LEFT JOIN context_msgtype ctx_msg ON ctx_msg.msgtype = ctx.msgtype
                    LEFT JOIN context_level ctx_lvl ON ctx_lvl.level = ctx.level
                    
                    LEFT JOIN origin ori ON ctx.id = ori.id_context
                    
                    LEFT JOIN egeo eg ON ev.id = eg.id_event
                    LEFT JOIN egeo_type eg_tp ON eg_tp.type = eg.type
                    LEFT JOIN egeo_subtype eg_sbtp ON eg_sbtp.subtype = eg.subtype
                    
                    LEFT JOIN position pos ON pos.id_egeo = eg.id
                    LEFT JOIN address adr ON adr.id_loc = pos.id_loc
                    
                    LEFT JOIN etype et ON et.id_event = ev.id
                    LEFT JOIN etype_env et_ev ON et_ev.env = et.env
                    LEFT JOIN etype_subenv et_sbev ON et_sbev.subenv = et.subenv
                
                WHERE pos.coord IS NOT NULL AND st_dwithin(pos.coord, ST_SetSRID(ST_Point(${center.x}, ${center.y}), 4326), ${degrees});
                `
            );

            return emsi.rows[0] ? { success: true, emsi: emsi.rows } : { success: false, message: 'Mensagens de Emergência inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar as mensagens de emergência!' };
        }
    }

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

                    if (data.weathers) {
                        for (const weather of data.weathers) weather.id_egeo = id_egeo;

                        await trx('egeo_has_egeo_subweather').insert(data.weathers);
                    }
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
                    for (const evac of data.evacs) evac.id_event = data.event.id;

                    await trx('evac').insert(data.evacs);
                }

                if (data.casualties) {
                    for (const casualty of data.casualties) casualty.id_event = data.event.id;

                    await trx('casualties').insert(data.casualties);
                }

                if (data.external_infos) {
                    await trx('external_info').insert(data.external_infos);
                }

                await trx('origin').insert(data.origin);

                await trx('tso_2_0').insert(data.tso_2);

                return { success: true, message: 'Mensagem de emergência cadastrada com sucesso!' };
            });

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Falha ao cadastrar a mensagem de emergência!' };
        }
    }
}

module.exports = EMSI;
