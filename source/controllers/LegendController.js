const Legend = require('../models/Legend');

class LegendController {
    static async index(req, res) {
        const result = await Legend.findAll();
        return result.success ? res.send(result) : res.status(404).send(result);
    }
}

module.exports = LegendController;
