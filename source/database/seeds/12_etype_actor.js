
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('etype_actornv3').del();
    await trx('etype_actornv2').del();
    await trx('etype_actor').del();
  }).then(function () {
      // Inserts seed entries
      return knex('etype_actor').insert([
        {actor: 'ANI', desc: 'Animais'},
        {actor: 'BEV', desc: 'Ambiente Contruído'},
        {actor: 'PPL', desc: 'Pessoas'},
        {actor: 'VEH', desc: 'Veículos'}
      ]);
    });
};
