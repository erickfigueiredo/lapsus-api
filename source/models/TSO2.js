const knex = require('../database/knex');
const Message = require('../utils/Message');

class TSO2 {
    static async findOne(id) {
        try {

        }catch(e){
            Message.warning(e);
            return {success: false, message: ''};
        }

    }

    static async findAll(page) {
        try {

        }catch(e){
            Message.warning(e);
            return {success: false, message: ''};
        }

    }

    static async create(data, files) {
        try {


        }catch(e){
            Message.warning(e);
            return {success: false, message: ''};
        }

    }
}

module.exports = TSO2;
