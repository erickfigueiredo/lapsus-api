// Tabela Context

exports.up = function (knex) {
    return knex.schema.createTable('context', function (table) {
        table.string('id', 40).primary().notNullable();
        table.string('freetext', 500);
        table.string('urgency', 15);
        table.string('seclass', 7).references('seclass').inTable('context_seclass').onDelete('CASCADE');
        table.string('mode', 6).notNullable().references('mode').inTable('context_mode').onDelete('CASCADE');
        table.string('msgtype', 6).notNullable().references('msgtype').inTable('context_msgtype').onDelete('CASCADE');
        table.string('level', 6).references('level').inTable('context_level').onDelete('CASCADE');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('context');
};
