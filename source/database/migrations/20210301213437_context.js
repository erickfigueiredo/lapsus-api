// Tabela Context

const tableName = 'context';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id', 40).primary().notNullable();
        table.string('freetext', 500);
        table.string('urgency', 15);
        table.string('seclass', 7).references('seclass').inTable('context_seclass');
        table.string('mode', 6).notNullable().references('mode').inTable('context_mode');
        table.string('msgtype', 6).notNullable().references('msgtype').inTable('context_msgtype');
        table.string('level', 6).references('level').inTable('context_level');
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
