
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('etype_subenv').insert([
    { env: 'DIS', subenv: 'LNDSLD', desc: 'Deslizamento de terra' }
  ]);
};
