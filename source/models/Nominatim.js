const axios = require('axios');
const baseUrl = 'https://nominatim.openstreetmap.org';

const coordsHandler = require('../utils/CoordsHandler');

const Message = require('../utils/Message');

class Nominatim {
    static async findAddressesByPosition(position) {
        try {
            const coords = coordsHandler(position);

            const requests = coords.map(coord => {
                coord = coord.split(' ');

                return axios.get(`${baseUrl}/reverse?format=jsonv2&lat=${coord[0]}&lon=${coord[1]}`, { timeout: 3000 })
            });

            const result = await Promise.all(requests);

            const addresses = [];
            for (const res of result) {
                if (res.data.display_name) {
                    addresses.push({ address: res.data.display_name });
                } else {
                    throw new Error('Nominatim (OMS) - ' + res.data.error);
                }
            }

            return { success: true, addresses };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os endereços das coordenadas!' };
        }
    }
}

module.exports = Nominatim;
