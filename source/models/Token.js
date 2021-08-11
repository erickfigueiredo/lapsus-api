const knex = require('../database/knex');
const Message = require('../utils/Message')

class Token {

    static async findOne() {
        try {

        } catch (e) {
            Message.warning(e);
            return {success: false, message: ''};
        }
    }

    static async create() {
        try {

        } catch (e) {
            Message.warning(e);
            return {success: false, message: ''};
        }
    }

    static async delete() {
        try {

        } catch (e) {
            Message.warning(e);
            return {success: false, message: ''};
        }
    }

}

module.exports = Token;
