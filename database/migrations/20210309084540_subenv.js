
exports.up = function(knex) {
    return knex.schema.createTable('subenv', function(table) {
        table.string('subenv', 10).notNullable().primary();
        table.string('desc', 100).notNullable();
        table.string('env', 10).references('env').onTable('etype_env');
        table.timestamp(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('subenv');
};
