
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('context_level').del()
    .then(function () {
      // Inserts seed entries
      return knex('context_level').insert([
        { level: 'STRTGC', desc: 'Estratégico' }
      ]);
    });
};
