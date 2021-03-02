exports.up = function (knex) {
    return knex.schema.createTable('evac', function (table) {
        table.increment('id').primary().notNullable();
        table.string('event_id', 40).notNullable().references('id').inTable('event');
        table.integer('displaced').unsigned();
        table.integer('evacuated').unsigned();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('evac')
};
