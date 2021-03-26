// Tabela Etype_has_etype_subcategory

const tableName = 'etype_has_etype_subcategory';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('subcategory', 10).notNullable();
        table.string('category', 10).notNullable();
        table.foreign(['subcategory', 'category']).references(['subcategory', 'category']).on('etype_subcategory');
        table.primary(['id_event', 'subcategory', 'category']);
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
