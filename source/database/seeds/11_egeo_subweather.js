
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('egeo_subweather').insert([
    { weather: 'HUM', subweather: 'CORECT', desc: 'Condições Corretas de Umidade' },
    { weather: 'HUM', subweather: 'DRZLE', desc: 'Chuvisco' },
    { weather: 'HUM', subweather: 'FOG', desc: 'Névoa' },
    { weather: 'HUM', subweather: 'RAIN', desc: 'Chuva' },
    { weather: 'HUM', subweather: 'RAINSR', desc: 'Rains Shower ???' },
    { weather: 'HUM', subweather: 'THSTRN', desc: 'Tempestade e Chuva' },

    { weather: 'ICY', subweather: 'BLWSNW', desc: 'Soprando Neve' },
    { weather: 'ICY', subweather: 'CLRICE', desc: 'Clear Icing ???' },
    { weather: 'ICY', subweather: 'CORECT', desc: 'Sem Problemas em Relação ao Gelo' },
    { weather: 'ICY', subweather: 'FDRZLE', desc: 'Chuvisco Congelante' },
    { weather: 'ICY', subweather: 'FRAIN', desc: 'Chuva Congelante' },
    { weather: 'ICY', subweather: 'FRZFOG', desc: 'Névoa Congelante' },
    { weather: 'ICY', subweather: 'HAIL', desc: 'HAIL ???' },
    { weather: 'ICY', subweather: 'ICECRY', desc: 'Cristais de Gelo' },
    { weather: 'ICY', subweather: 'ICEPLT', desc: 'Precipitação de Grãos de Gelo' },
    { weather: 'ICY', subweather: 'MIXICE', desc: 'Mixed Icing' },
    { weather: 'ICY', subweather: 'RIMICE', desc: 'Geada de Gelo' },
    { weather: 'ICY', subweather: 'SLEET', desc: 'Granizo' },
    { weather: 'ICY', subweather: 'SNOW', desc: 'Precipitação de Cristais de Gelo' },
    { weather: 'ICY', subweather: 'SNWGRN', desc: 'Snow Grains ???' },
    { weather: 'ICY', subweather: 'SNWSHR', desc: 'Snow Shower' },

    { weather: 'TDS', subweather: 'CORECT', desc: 'Sem Problemas em Relação a Tempestade' },
    { weather: 'TDS', subweather: 'LGTNNG', desc: 'Raio' },
    { weather: 'TDS', subweather: 'THST', desc: 'Tempestade' },

    { weather: 'VIS', subweather: 'CORECT', desc: 'Sem Problemas em Relação a Visibilidade' },
    { weather: 'VIS', subweather: 'HAZE', desc: 'Perigo por Problemas de Visibilidade' },
    { weather: 'VIS', subweather: 'SMOKE', desc: 'Fumaça' },

    { weather: 'WIN', subweather: 'CORECT', desc: 'Sem Problemas com Condições de Ventania' },
    { weather: 'WIN', subweather: 'CYCL', desc: 'Ciclone' },
    { weather: 'WIN', subweather: 'DSTDVL', desc: 'Redemoinho de Poeira' },
    { weather: 'WIN', subweather: 'DSTSND', desc: 'Sopro de Areia ou Poeira' },
    { weather: 'WIN', subweather: 'DSTSTR', desc: 'Tempestade de Poeira' },
    { weather: 'WIN', subweather: 'FNLCLD', desc: 'Nuvem de Funil' },
    { weather: 'WIN', subweather: 'HURR', desc: 'Ciclone' },
    { weather: 'WIN', subweather: 'SNDSTR', desc: 'Tempestade de Areia' },
    { weather: 'WIN', subweather: 'STORM', desc: 'Tempestade' },
    { weather: 'WIN', subweather: 'TORN', desc: 'Tornado' },
    { weather: 'WIN', subweather: 'TRST', desc: 'Tempestade Tropical' },
    { weather: 'WIN', subweather: 'TYPH', desc: 'Tufão' },
    { weather: 'WIN', subweather: 'WHIR', desc: 'Furacão' },
    { weather: 'WIN', subweather: 'WTRSPT', desc: 'Tromba d`Água' }
  ]);
};
