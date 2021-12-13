const Joi = require('joi');

const updateValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
            'string.empty': 'Campo nome não pode ser vazio!',
        }),
        uuid: Joi.string().regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).messages({
            'string.pattern.base': 'Formato de UUID v4 inválido!',
            'string.empty': 'Campo uuid não pode ser vazio!'
        }),
    });
}

module.exports = { updateValidate };
