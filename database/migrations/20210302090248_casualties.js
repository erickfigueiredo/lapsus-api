// Tabela Casualties

exports.up = function (knex) {
    return knex.schema.createTable('casualties', function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('context').notNullable().references('context').inTable('casualties_context').onDelete('CASCADE');
        table.integer('decont').unsigned();
        table.integer('triagered').unsigned();
        table.integer('triageyellow').unsigned();
        table.integer('triagegreen').unsigned();
        table.integer('triageblack').unsigned();
        table.integer('missing').unsigned();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('casualties');
};
