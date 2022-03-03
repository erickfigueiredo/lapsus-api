// Tabela Contribution

const tableName = 'contribution';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.datetime('occurrence', { precision: 6 });
        table.boolean('risk_damage').defaultTo('false').notNullable();
        table.boolean('victims').defaultTo('false').notNullable();
        table.string('published', 1).defaultTo('P').notNullable(); // Aprovado, Reprovado, Pendente
        table.string('desc', 500);
        //table.specificType('local', 'Geometry').notNullable();
        table.integer('id_category').unsigned().notNullable().references('id').inTable('category');
        table.integer('id_collaborator').unsigned().references('id').inTable('user');
        table.integer('id_manager').unsigned().references('id').inTable('user');
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
