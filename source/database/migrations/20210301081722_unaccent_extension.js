
exports.up = function(knex) {
    return knex.raw(`CREATE EXTENSION IF NOT EXISTS unaccent`);
};

exports.down = function(knex) {
    return knex.raw(`DROP EXTENSION IF EXISTS unaccent`);
};
