exports.up = function (knex) {
    return knex.schema.createTable('casualties', function (table) {
        table.increment('id').primary().notNullable();
        table.string('event_id', 40).notNullable().references('id').inTable('event');
        table.string('context').notNullable().references('context').inTable('casualties_context');
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
