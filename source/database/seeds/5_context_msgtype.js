
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('context_msgtype').del()
    .then(function () {
      // Inserts seed entries
      return knex('context_msgtype').insert([
        { msgtype: 'ALERT', desc: 'Informação Inicial apenas Requer Atenção pelos Destinatários Direcionados' }
      ]);
    });
};
