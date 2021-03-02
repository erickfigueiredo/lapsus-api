exports.up = function (knex) {
    return knex.schema.createTable('link', function (table) {
        table.string('id', 40).primary().notNullable();
        table.string('context_id', 40).notNullable().references('id').inTable('context');
        table.string('role', 10).references('role').inTable('link_role');
        table.timestamp(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('link')
};
