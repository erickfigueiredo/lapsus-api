const a = (req, res, next) => {
    console.log(req)
    console.log('entrou')
    next();
}

module.exports = {a};