// Tabela Etype_subcategory

const tableName = 'etype_subcategory';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('subcategory', 10).notNullable();
        table.string('category', 10).notNullable().references('category').inTable('etype_category');
        table.string('desc', 100);
        table.primary(['subcategory', 'category']);
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
