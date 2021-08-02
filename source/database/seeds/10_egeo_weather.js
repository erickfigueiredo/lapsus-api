
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('egeo_subweather').del();
    await trx('egeo_weather').del();
  }).then(function () {
      // Inserts seed entries
      return knex('egeo_weather').insert([
        { weather: 'HUM', desc: 'Condições Úmidas' },
        { weather: 'ICY', desc: 'Condições Gélidas' },
        { weather: 'TDS', desc: 'Condições Tempestivas' },
        { weather: 'TMPsxx', desc: 'Temperatura ?' },
        { weather: 'VIS', desc: 'Condições de Visibilidade' },
        { weather: 'Wddsss', desc: 'Direção do vento e Velocidade' },
        { weather: 'WIN', desc: 'Condições de ventania' }
      ]);
    });
};
