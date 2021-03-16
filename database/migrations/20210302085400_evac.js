//Tabela Evac

exports.up = function (knex) {
    return knex.schema.createTable('evac', function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.datetime('datime', { precision: 6 });
        table.integer('displaced').unsigned();
        table.integer('evacuated').unsigned();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('evac');
};
