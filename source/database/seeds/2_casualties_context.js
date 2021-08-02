
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('casualties_context').del()
    .then(function () {
      // Inserts seed entries
      return knex('casualties_context').insert([
        {context: 'REQ_ACTION', desc: 'Ação Requerida'},
        {context: 'ALR_TREATED', desc: 'Já Tratada'},
        {context: 'PRED_URGENT', desc: 'Previsto com Urgência'},
        {context: 'PRED_MEDIUM', desc: 'Previsto com Médio Prazo'},
        {context: 'INITIAL_STAT', desc: 'Declaração Não Confirmada'},
        {context: 'PRELIM_STAT', desc: 'Avaliação Preliminar'}
      ]);
    });
};
