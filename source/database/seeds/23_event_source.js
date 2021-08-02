
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('event_source').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_source').insert([
        {source: 'HUMOBS', desc: 'Observação Humana'},
      ]);
    });
};
