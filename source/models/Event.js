const knex = require('../database/knex');
const Message = require('../utils/Message')

class EventStatus {
    static async findAllEventStatus() {
        try {

        }catch(e) {
            Message.warning(e);
            return {success: false, message: ''};
        }
    }
}

class EventRiskAssessment {
    static async findAllEventRiskAssessment() {
        try {

        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }
    }
}

class EventCause {
    static async findAllEventCause() {
        try {

        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }
    }
}

class EventLocType {
    static async findAllEventLocType() {
        try {

        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }
    }

    static async findAllEventSubLocType(locType) {
        try {

        } catch (e) {
            Message.warning(e);
            return { success: false, message: '' };
        }
    }
}

class EventTypeActor {
    static async findAllActor() {
        try {

        } catch(e) {
            Message.warning(e);
            return {success: false, message: ''};
        } 
    }

    static async findAllActorLv2(actor) {
        try {

        } catch(e) {
            Message.warning(e);
            return {success: false, message: ''};
        } 
    }

    static async findAllActorLv3(actor, actorLv2) {
        try {

        } catch(e) {
            Message.warning(e);
            return {success: false, message: ''};
        } 
    }
}


module.exports = {
    EventRiskAssessment,
    EventCause,
    EventLocType,
    EventTypeActor
};
