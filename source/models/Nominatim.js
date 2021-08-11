const axios = require('axios');
const baseUrl = 'https://nominatim.openstreetmap.org';

const Message = require('../utils/Message');

class Nominatim {
    static async findAddressByCoordinates(lat, long) {
        try{
            const result = await axios.get(`${baseUrl}/reverse?lat=${lat}&lon=${long}`);
            
            return {success: true, address: result.data};
        } catch(e) {
            Message.warning(e);
            return {success: false, message: 'Houve um erro ao recuperar o endereço da coordenada!'};
        }
    }
}

module.exports = { Nominatim };
