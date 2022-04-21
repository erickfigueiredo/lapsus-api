const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).required().messages({
            'string.pattern.base': 'Categoria deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Categoria deve conter no mínimo 3 letras!',
            'string.max': 'Categoria deve conter no máximo 50 letras!',
            'string.empty': 'Campo categoria não pode ser vazio!',
            'any.required': 'Campo categoria é obrigatório!'
        }),
        desc: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 500 caracteres!',
            'string.empty': 'Campo descrição não pode ser vazio!'
        })
    })
}

const updateValidate = () => {
    return Joi.object().min(2).keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id!',
            'any.required': 'Id é obrigatório!'
        }),
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).messages({
            'string.pattern.base': 'Categoria deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Categoria deve conter no mínimo 3 letras!',
            'string.max': 'Categoria deve conter no máximo 50 letras!',
            'string.empty': 'Campo categoria não pode ser vazio!'
        }),
        desc: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).empty('').min(3).max(500).messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 500 caracteres!',
            //'string.empty': 'Campo descrição não pode ser vazio!'
        })
    }).messages({
        'object.min': 'É necessário informar o id e algum atributo!'
    })
}

module.exports = {
    createValidate,
    updateValidate
};
