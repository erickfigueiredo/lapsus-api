// Tabela Etype_actornv2

exports.up = function (knex) {
    return knex.schema.createTable('etype_actornv2', function (table) {
        table.string('actornv2', 10).notNullable();
        table.string('actor', 10).notNullable().references('actor').inTable('etype_actor');
        table.string('desc', 100);
        table.primary(['actornv2', 'actor']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_actornv2');
};
