// Tabela de Instituição

const tableName = 'institution';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('phone', 12).notNullable().unique();
        table.string('street', 100).notNullable();
        table.string('neighborhood', 100).notNullable();
        table.string('city', 60).notNullable();
        table.string('state', 2).notNullable();
        table.string('zipcode', 8).notNullable();
        table.string('number', 8).notNullable();

        // Alterar a forma de representar o endereço para obter informações mais interessantes sobre esse 
        table.timestamps(false, true);
    });

    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
