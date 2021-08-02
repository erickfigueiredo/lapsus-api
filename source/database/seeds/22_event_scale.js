
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('event_scale').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_scale').insert([
        {scale: 1, desc: 'Nível 1 - O Evento é Tratado com Recursos Implantados na Fase de Pré-Planejamento' },
        {scale: 2, desc: 'Nível 2 - O Evento é Tratado com Recursos Implantados Somente pela Organização Afetada' },
        {scale: 3, desc: 'Nível 3 - O Evento é Tratado com Recursos Implantados pela Organização Afetada, porém com Apoio de Organizações Vizinhas sob Acordos Normais' },
        {scale: 4, desc: 'Nível 4 - O Evento é Tratado com Recursos Implantados pela Organização Afetada, porém com Apoio de Organização de Qualquer Lugar ao País' },
        {scale: 5, desc: 'Nível 5 - Este Nível de Resposta Cobre a Gestão de Qualquer Auxílio Recebido para Ajudar a Organização, Usando Protocolos das Nações Unidas, União Europeia ou OTAN' }
      ]);
    });
};
