// Tabela Etype_has_etype_actornv3

exports.up = function (knex) {
    return knex.schema.createTable('etype_has_etype_actornv3', function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('actornv3').notNullable();
        table.string('actornv2').notNullable();
        table.string('actor').notNullable();
        table.foreign(['actornv3', 'actornv2', 'actor']).references(['actornv3', 'actornv2', 'actor']).on('etype_actornv3');
        table.primary(['id_event', 'actornv3', 'actornv2', 'actor']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_has_etype_actornv3');
};
