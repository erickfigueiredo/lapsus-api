// Tabela Origin

exports.up = function (knex) {
    return knex.schema.createTable('origin', function (table) {
        table.string('id_org', 40).notNullable();
        table.string('name', 80);
        table.integer('id_user').unsigned().references('id').inTable('user');   //Gestor
        table.string('id_context', 40).notNullable().references('id').inTable('context');
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('origin')
};
