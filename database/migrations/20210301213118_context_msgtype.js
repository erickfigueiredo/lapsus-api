exports.up = function (knex) {
    return knex.schema.createTable('context_msgtype', function (table) {
        table.string('msgtype', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('context_msgtype');
};
