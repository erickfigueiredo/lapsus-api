// Tabela Etype_actornv3

exports.up = function (knex) {
    return knex.schema.createTable('etype_actornv3', function (table) {
        table.string('actornv3', 10).notNullable();
        table.string('actornv2', 10).notNullable();
        table.string('actor', 10).notNullable();
        table.string('desc', 100);
        table.foreign(['actornv2', 'actor']).references(['actornv2', 'actor']).on('etype_actornv2');
        table.primary(['actornv3', 'actornv2', 'actor']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_actornv3');
};
