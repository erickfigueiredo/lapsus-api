// Tabela Etype_has_etype_actornv3

const tableName = 'etype_has_etype_actornv3';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('actornv3').notNullable();
        table.string('actornv2').notNullable();
        table.string('actor').notNullable();
        table.foreign(['actornv3', 'actornv2', 'actor']).references(['actornv3', 'actornv2', 'actor']).on('etype_actornv3');
        table.primary(['id_event', 'actornv3', 'actornv2', 'actor']);
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
