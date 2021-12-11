// Tabela Address

const tableName = 'address';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        /*
            Nessa tabela, a Atomicidade de endereço é violada devido ao formato de retorno
            da Nominatim API, dependendo da coordenada informada, alguns atributos existem 
            e outros não. Portanto foi utilizada a propriedade que retorna o endereço por 
            extenso.
        */
        table.increments('id').notNullable().primary();
        table.string('address', 256).notNullable();
        table.integer('id_loc').unsigned().notNullable().references('id_loc').inTable('position');
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
