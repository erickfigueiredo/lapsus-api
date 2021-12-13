// Tabela Event

const tableName = 'event';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id', 40).primary().notNullable();
        table.string('name', 40);
        table.string('main_event_id', 40);
        table.integer('certainty').unsigned();
        table.datetime('decl_datime', { precision: 6 });
        table.datetime('occ_datime', { precision: 6 });
        table.datetime('obs_datime', { precision: 6 });
        table.string('freetext', 500);
        table.string('source', 10).references('source').inTable('event_source');
        table.integer('scale').unsigned().references('scale').inTable('event_scale');
        table.string('status', 10).references('status').inTable('event_status').
        table.string('risk_assessmnt', 10).references('risk_assessmnt').inTable('event_risk_assessmnt');
        table.string('cause', 10).references('cause').inTable('event_cause');
        table.timestamps(false, true);
    });

    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
