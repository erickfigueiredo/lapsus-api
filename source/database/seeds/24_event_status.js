
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('event_status').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_status').insert([
        {status: 'COM', desc: 'Evento Completo'},
        {status: 'IPR', desc: 'Evento em Progresso'},
        {status: 'NST', desc: 'Evento Não Iniciado'},
        {status: 'STOP', desc: 'Evento sob Controle, sem Necessidade de Recursos Adicionais'}
      ]);
    });
};
