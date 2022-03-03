
exports.up = function (knex) {
    return knex.raw(`
        ALTER TABLE contribution ADD COLUMN local geometry(Geometry, 4326) NOT NULL;
        ALTER TABLE position ADD COLUMN coord geometry(Geometry, 4326);
    `);
};

exports.down = function (knex) {};
