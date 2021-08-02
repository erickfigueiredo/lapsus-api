
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('etype_subenv').del();
    await trx('etype_env').del();
  }).then(function () {
      // Inserts seed entries
      return knex('etype_env').insert([
        { env: 'DIS', desc: 'Natural/Feito pelo Homem' }
      ]);
    });
};
