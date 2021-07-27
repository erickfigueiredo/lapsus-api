// Arquivo de População Inicial da Tabela Category

exports.seed = function(knex) {
  return knex('category').del()
    .then(function () {
      return knex('category').insert([
        {name: 'afastamento do solo de fundações'},
        {name: 'aumento repentino do nível de água'},
        {name: 'deformações em estradas'},
        {name: 'deslizamento de lama'},
        {name: 'deslizamento de mata'},
        {name: 'deslizamento de pedregulhos'},
        {name: 'diminuição repentina do nível de água'},
        {name: 'inclinação de objetos ou estruturas'},
        {name: 'instalações subterrâneas quebradas'},
        {name: 'movimentação de objetos ou estruturas'},
        {name: 'nascentes'},
        {name: 'pedregulhos recentes na paisagem'},
        {name: 'portas e janelas Tortas ou Emperradas'},
        {name: 'rachadura em construções ou calçadas'},
        {name: 'rompimento de superfície do solo pela água'},
        {name: 'sons incomuns sem motivo aparente'},
      ]);
    });
};
