exports.up = function (knex) {
    return knex.schema.createTable('origin', function (table) {
        table.string('org_id', 40).notNullable();
        table.string('name', 80);
        table.string('context_id', 40).notNullable().references('id').inTable('context');
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('origin')
};
