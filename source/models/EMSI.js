const knex = require('../database/knex');
const Message = require('../utils/Message');

class EMSI {
    static async findAll(center, degrees) {
        try {
            const emsi = await knex.raw(
                `SELECT con.id, to_char(con.created_at, 'DD/MM/YYYY') as created_at, con.freetext, con.urgency, 
                    ori.name, ori.id_org,
                    ext_i.id, ext_i.freetext, ext_i.uri, 
                    ext_t.type, ext_t.desc,
                    con_se.seclass, con_se.desc,
                    con_mo.mode, con_mo.desc,
                    con_msg.msgtype, con_msg.desc,
                    con_lvl.level, con_lvl.desc,
                    evt.id, evt.name, evt.main_event_id, evt.certainty, evt.decl_datime, evt.occ_datime, evt.freetext,
                    evt_src.source, evt_src.desc,
                    evt_scl.scale, evt_scl.desc,
                    evt_sts.status, evt_sts.desc,
                    evt_cau.cause, evt_cau.desc,
                    evt_rsk.risk_assessmnt, evt_rsk.desc,
                    eg.id, eg.freetext, 
                    eg_sts.status, eg_sts.desc,
                    eg_sbt.subtype, eg_sbt.desc, 
                    eg_tp.type, eg_tp.desc,
                    eg_sb.subweather, eg_sb.desc, 
                    eg_w.weather, eg_w.desc, 
                    pos.id_loc, pos.name, ST_ASTEXT(pos.coord),
                    adr.id, adr.address, 
                    et_ev.env, et_ev.desc, 
                    et_sc.subcategory, et_sc.desc,
                    et_c.category, et_c.desc, 
                    et_sl.subloctype, et_sl.desc, 
                    et_l.loctype, et_l.desc, 
                    et_a3.actornv3, et_a3.desc, 
                    et_a2.actornv2, et_a2.desc,
                    et_a1.actor, et_a1.desc

                    FROM tso_2_0

                    LEFT JOIN context con ON tso_2_0.id_context = con.id
                    LEFT JOIN origin ori ON con.id = ori.id_context
                    LEFT JOIN external_info ext_i ON con.id = ext_i.id_context
                    LEFT JOIN external_info_type ext_t ON ext_i.type = ext_t.type 
                    LEFT JOIN context_seclass con_se ON con.seclass = con_se.seclass
                    LEFT JOIN context_mode con_mo ON con.mode = con_mo.mode
                    LEFT JOIN context_msgtype con_msg ON con.msgtype = con_msg.msgtype
                    LEFT JOIN context_level con_lvl ON con.level = con_lvl.level
                    LEFT JOIN event evt ON tso_2_0.id_event = evt.id
                    LEFT JOIN event_source evt_src ON evt.source = evt_src.source
                    LEFT JOIN event_scale evt_scl ON evt.scale = evt_scl.scale
                    LEFT JOIN event_status evt_sts ON evt.status = evt_sts.status
                    LEFT JOIN event_cause evt_cau ON evt.cause = evt_cau.cause
                    LEFT JOIN event_risk_assessmnt evt_rsk ON evt.risk_assessmnt = evt_rsk.risk_assessmnt
                    LEFT JOIN egeo eg on evt.id = eg.id_event
                    LEFT JOIN egeo_has_egeo_subweather eg_h on eg.id = eg_h.id_egeo
                    LEFT JOIN egeo_status eg_sts on eg.status = eg_sts.status
                    LEFT JOIN egeo_subtype eg_sbt on eg.subtype = eg_sbt.subtype
                    LEFT JOIN egeo_subweather eg_sb on eg_sb.subweather = eg_h.subweather and eg_sb.weather = eg_h.weather
                    LEFT JOIN etype et on et.id_event = evt.id
                    LEFT JOIN egeo_weather eg_w on eg_w.weather = eg_h.weather
                    LEFT JOIN position pos on pos.id_egeo = eg.id
                    LEFT JOIN address adr on adr.id_loc = pos.id_loc
                    LEFT JOIN etype_has_etype_subcategory et_h_sb on et_h_sb.id_event = evt.id
                    LEFT JOIN etype_has_etype_subloctype et_h_sl on et_h_sl.id_event = evt.id
                    LEFT JOIN etype_has_etype_actornv3 et_ha on et_ha.id_event = evt.id
                    LEFT JOIN egeo_type eg_tp on eg_sbt.type = eg_tp.type
                    LEFT JOIN etype_env et_ev on et_ev.env = et.env
                    LEFT JOIN etype_subcategory et_sc on et_sc.category = et_h_sb.category and et_sc.subcategory = et_h_sb.subcategory
                    LEFT JOIN etype_category et_c on et_c.category = et_h_sb.category
                    LEFT JOIN etype_subloctype et_sl on et_h_sl.loctype = et_sl.loctype and et_h_sl.subloctype = et_sl.subloctype
                    LEFT JOIN etype_loctype et_l on et_l.loctype = et_h_sl.loctype
                    LEFT JOIN etype_actornv3 et_a3 on et_a3.actornv3 = et_ha.actornv3 and et_a3.actornv2 = et_ha.actornv2 and et_a3.actor = et_ha.actor
                    LEFT JOIN etype_actornv2 et_a2 on et_a2.actornv2 = et_ha.actornv2 and et_a2.actor = et_ha.actor
                    LEFT JOIN etype_actor et_a1 on et_a1.actor = et_ha.actor

                    WHERE st_dwithin(pos.coord, ST_SetSRID(ST_Point(${center.x}, ${center.y}), 4326), ${degrees});
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
