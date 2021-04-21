// Tabela event_risk_assessmnt

const tableName = 'event_risk_assessmnt';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('risk_assessmnt', 10).primary().notNullable();
        table.string('desc', 100);
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
