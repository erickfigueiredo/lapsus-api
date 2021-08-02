
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('event_cause').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_cause').insert([
        { cause: 'ACC', desc: 'Acidental' },
        { cause: 'NAT', desc: 'Natural' },
        { cause: 'DEL', desc: 'Deliberada' }
      ]);
    });
};
