
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('context_seclass').del()
    .then(function () {
      // Inserts seed entries
      return knex('context_seclass').insert([
        { seclass: 'UNCLAS', desc: 'Não Classificado' }
      ]);
    });
};
