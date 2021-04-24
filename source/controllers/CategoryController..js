const { exist } = require('joi');
const Category = require('../models/Category');
const CategoryValidator = require('../validators/CategoryValidator');

class categoryController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const ctg = await Category.findOne(id);
        return ctg.success ? res.send(ctg) : res.status(404).send(ctg);
    }

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const ctgs = await Category.findAll(page);
        return ctgs.success ? res.send(ctgs) : res.status(404).send(ctgs);
    }

    static async create(req, res) {
        const valid = CategoryValidator.createValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const existName = await Category.findByName(req.body.name);
        if (existName.success)
            return res.status(409).send({ success: false, message: 'Nome já cadastrado' });


        const result = await Category.create(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const valid =  CategoryValidator.updateValidate();
        const {error} = valid.validate(req.body);

        if(error)
            return res.status(400).send({success: false, message: error.details[0].message});

        
        const form = req.body;
        
        const ctg = await Category.findOne(req.body.id);

        if(ctg.success){
            const toUpdate = {};

            if(form.name && ctg.category.name != form.name) {
                const existName = await Category.findByName(form.name);
                if(existName.success)
                    return res.status(409).send({success: false, message: 'Nome já cadastrado!'});
            
                
                toUpdate.name = form.name;
            }
            
            if(form.desc && ctg.category.desc != form.desc) toUpdate.desc = form.desc;

            if(Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Category.update(toUpdate);
                return result.success ? res.send(result):res.status(400).send(result);
            }
            return res.send(inst);
        }
        return res.status(404).send({success: false, message: 'Categoria inexistente!'});
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const existCategory = await Category.findOne(id);
        if (!existCategory.success)
            return res.status(404).send(existCategory);


        const result = await Category.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = CategoryController;
