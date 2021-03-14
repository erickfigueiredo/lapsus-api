
exports.up = function(knex) {
    return knex.schema.createTable('etype_env', function(table){
        table.string('env', 10).notNullable().primary();
        table.string('desc', 100);
        table.string('subtype', 10).notNullable();
        table.string('type', 10).notNullable();
        table.timestamp(false, true);
        table.foreign(['subtype', 'type']).references(['subtype', 'type']).on('egeo_subtype');
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('etype_env');
};
