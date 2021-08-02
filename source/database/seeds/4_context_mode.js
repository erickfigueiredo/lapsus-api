
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('context_mode').del()
    .then(function () {
      // Inserts seed entries
      return knex('context_mode').insert([
        {mode: 'ACTUAL', desc: 'Indica que a Mensagem EMSI está Relacionada a um Evento Real'}
      ]);
    });
};
