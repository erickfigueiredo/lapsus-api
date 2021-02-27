const c = require('ansi-colors');

class Message {
    static success(msg) {
        console.log(c.bgGreen.black(msg));
    }

    static info(msg) {
        console.log(c.blue.underline(msg));
    }

    static warning(msg) {
        console.log(c.yellow(msg));
    }

    static error(msg) {
        console.log(c.bold.bgRed(msg));
    }
}

module.exports = Message;