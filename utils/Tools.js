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

const genericMask = (value, pattern) => {
    const v = value.toString();

    if (v.length != (pattern.match(/#/g) || []).length) return false;
    let i = 0;
    
    return pattern.replace(/#/g, () => v[i++] || '');
}

module.exports = {
    Message,
    genericMask
};