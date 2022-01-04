
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('org_information').del()
        .then(function () {
            // Inserts seed entries
            return knex('org_information').insert([
                { name: 'Instância Lapsus', uuid: '0' }
            ]);
        });
};
