const knex = require('../../database/knex');
const Message = require('../../utils/Message');

class Weather {
    static async listAll() {
        try {
            const weather = await knex('egeo_weather')
                .join('egeo_subweather', 'egeo_weather.weather', 'egeo_subweather.weather',)
                .select('egeo_weather.weather', 'egeo_weather.desc as wth_desc',
                    'egeo_subweather.subweather', 'egeo_subweather.desc as subwth_desc')
                .orderBy('wth_desc', 'subwth_desc');

            const refactor = {}
            for (let i = 0; i < weather.length; i++) {
                if (!refactor[weather[i].weather]) {

                    refactor[weather[i].weather] = {
                        desc: weather[i].wth_desc,
                    };

                    refactor[weather[i].weather].subweather = [];
                }
                refactor[weather[i].weather].subweather.push({ subweather: weather[i].subweather, desc: weather[i].subwth_desc });
            }

            return weather[0] ? { success: true, weather: refactor } : { success: false, message: 'Opções de clima inexistentes!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar a listagem de climas!' };
        }
    }
}

module.exports = Weather;
