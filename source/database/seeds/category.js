
exports.seed = function(knex) {
  return knex('category').del()
    .then(function () {
      return knex('category').insert([
        {name: 'Afastamento do Solo de Fundações'},
        {name: 'Aumento Repentino do Nível de Água'},
        {name: 'Deformações em Estradas'},
        {name: 'Deslizamento de Lama'},
        {name: 'Deslizamento de Mata'},
        {name: 'Deslizamento de Pedregulhos'},
        {name: 'Diminuição Repentina do Nível de Água'},
        {name: 'Inclinação de Objetos ou Estruturas'},
        {name: 'Instalações Subterrâneas Quebradas'},
        {name: 'Movimentação de Objetos ou Estruturas'},
        {name: 'Nascentes'},
        {name: 'Pedregulhos Recentes na Paisagem'},
        {name: 'Portas e Janelas Tortas ou Emperradas'},
        {name: 'Rachadura em Construções ou Calçadas'},
        {name: 'Rompimento de Superfície do Solo pela Água'},
        {name: 'Sons Incomuns sem Motivo Aparente'},
      ]);
    });
};
