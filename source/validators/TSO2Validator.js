const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        event: Joi.object().keys({
            // verificar espaços vazios
            name: Joi.string().min(3).max(40).trim().messages({
                'string.min': 'Nome não pode ter menos de 3 caracteres!',
                'string.max': 'Nome não pode ter mais de 40 caracteres!',
                'string.empty': 'Nome não pode ser vazio!'
            }),
            certainty: Joi.number().integer().min(0).max(100).messages({
                'number.integer': 'Probabilidade de Ocorrência deve ser um número inteiro!',
                'number.min': 'Probabilidade não pode ser menor que 0!',
                'number.max': 'Probabilidade não pode ser maior que 100!',
                'number.empty': 'Probabilidade não pode ser vazia'
            }),
            decl_datime: Joi.date().max('now').messages({
                'date.max': 'Momento da identificação não pode ser no futuro!',
                'date.empty': 'Momento da identificação não pode ser vazio!'
            }), //momento da Identificação
            occ_time: Joi.date().max('now').messages({
                'date.max': 'Momento da ocorrência não pode ser no futuro!',
                'date.empty': 'Momento da ocorrência não pode ser vazio!'
            }), //momento da occorência
            // verificar espaços vazios
            freetext: Joi.string().min(3).max(500).messages({
                'string.min': 'Descrição do evento não pode ter menos que 3 caracteres!',
                'string.max': 'Descrição do evento não pode ter mais que 500 caracteres!',
                'string.empty': 'Descrição do evento não pode ser vazia!'
            }),
            // Verificar se esse é obrigatorio
            scale: Joi.number().integer().min(1).max(5).messages({
                'number.integer': 'Escala deve ser um número inteiro!',
                'number.min': 'Escala não pode ser menor que 1!',
                'number.max': 'Escala não pode ser maior que 5!',
                'number.empty': 'Escala não pode ser vazia'
            }),
            risk_assessmnt: Joi.string().regex().messages({
                'string.pattern': '',
                'string.empty': ''
            }),
            status: Joi.string().regex().messages({
                'string.pattern': '',
                'string.empty': ''
            }),
            cause: Joi.string().regex().messages({
                'string.pattern': '',
                'string.empty': ''
            })

            //obs_datime: Joi, // Gerado pelo sistema
            //source: Joi, // HUMOBS
        }),

        context: Joi.object().keys({
            // verificar espaços vazios
            freetext: Joi.string().min(3).max(500).messages({
                'string.min': 'Descrição do contexto não pode ter menos que 3 caracteres!',
                'string.max': 'Descrição do contexto não pode ter mais que 500 caracteres!',
                'string.empty': 'Descrição do contexto não pode ser vazia!'
            }),
            // Verificar se é obrigatorio
            urgency: Joi.string().regex().messages({
                'string.pattern': '',
                'string.empty': 'Urgência não pode ser vazia!'
            })
        }),

        loctypes: Joi.array().items(
            Joi.object().keys({
                loctype: Joi.string().regex(/^[A-Z]{3,6}$/).when(
                    'subloctype',
                    {
                        is: Joi.exist(),
                        then: Joi.required().messages({
                            'any.required': 'Tipo de local é necessário quando um subtipo é informado!'
                        })
                    }).messages({
                        'string.pattern': 'Código de tipo de local inválido!',
                        'string.empty': 'Tipo de local não pode ser vazio!'
                    }),
                subloctype: Joi.string().regex(/^[A-Z]{3,6}$/).messages({
                    'string.pattern': 'Código de sublocal inválido!',
                    'string.empty': 'Tipo de sublocal não pode ser vazio!'
                })
            })
        ),

        actors: Joi.array().items(
            Joi.object().keys({
                actor: Joi.string().regex(/^[A-Z]{3}$/).when(
                    'actornv2',
                    {
                        is: Joi.exist(),
                        then: Joi.required().messages({
                            'any.required': 'É necessário informar o ator base!'
                        })
                    }).messages({
                        'string.pattern': 'Código de ator inválido!',
                        'string.empty': 'Ator não pode ser vazio!'
                    }),
                actornv2: Joi.string().regex(/^[0-9A-Z]{1,6}$/).when(
                    'actornv3',
                    {
                        is: Joi.exist(),
                        then: Joi.required().messages({
                            'any.required': 'É necessário informar um ator nível 2!'
                        })
                    }).messages({
                        'string.pattern': 'Código de ator nível 2 inválido',
                        'string.empty': 'Ator nível 2 não pode ser vazio!'
                    }),
                actorNv3: Joi.string().regex(/^[0-9A-Z]{2,6}$/)
                    .messages({
                        'string.pattern': 'Código de ator nível 3 inválido',
                        'string.empty': 'Ator nível 3 não pode ser vazio!'
                    })
            })
        ),

        casualties: Joi.array().items(
            Joi.object({
                context: Joi,
                datime: Joi.date().max('now').messages({
                    'date.max': 'Momento da declaração de vítimas não pode ser no futuro!',
                    'date.empty': 'Momento da declaração de vítimas não pode ser vazio'
                }),
                triagered: Joi.number().integer().min(0).messages({
                    'number.integer': '... deve ser um número inteiro!',
                    'number.min': '... não pode ser menor que 0!',
                    'number.empty': '... não pode ser vazio!'
                }),
                triageyellow: Joi.number().integer().min(0).messages({
                    'number.integer': '... deve ser um número inteiro!',
                    'number.min': '... não pode ser menor que 0!',
                    'number.empty': '... não pode ser vazio!'
                }),
                triagegreen: Joi.number().integer().min(0).messages({
                    'number.integer': '... deve ser um número inteiro!',
                    'number.min': '... não pode ser menor que 0!',
                    'number.empty': '... não pode ser vazio!'
                }),
                triageblack: Joi.number().integer().min(0).messages({
                    'number.integer': '... deve ser um número inteiro!',
                    'number.min': '... não pode ser menor que 0!',
                    'number.empty': '... não pode ser vazio!'
                }),
                missing: Joi.number().integer().min(0).messages({
                    'number.integer': '... deve ser um número inteiro!',
                    'number.min': '... não pode ser menor que 0!',
                    'number.empty': '... não pode ser vazio!'
                })
            })
        ),

        // Revisar os nomes tipo e subtipo
        egeos: Joi.array().items(
            Joi.object().keys({
                datime: Joi.date().max('now').messages({
                    'date.max': 'Momento da declaração de situação do local não pode ser no futuro!'
                }),
                freetext: Joi,
                type: Joi.string().regex(/^[A-Z]{3,5}$/).when(
                    'subtype',
                    {
                        is: Joi.exist(),
                        then: Joi.required().messages({
                            'any.required': 'É necessário informar um tipo de local!'
                        })
                    }
                ).messages({
                    'string.pattern': 'Código de tipo de egeo inválido!',
                    'string.empty': 'Tipo de egeo não pode ser vazio!'
                }),
                subtype: Joi.string().regex(/^[A-Z]{2,7}$/).messages({
                    'string.pattern': 'Código do subtipo de egeo inválido!',
                    'string.empty': 'Subtipo de egeo não pode ser vazio!'
                })
            })
        ),

        evacs: Joi.array().items(
            Joi.object().keys({
                datime: Joi.date().max('now').messages({
                    'date.max': 'Momento da declaração dos evacuados não pode ser no futuro!'
                }),
                displaced: Joi.number().integer().min(0).messages({
                    'number.integer': 'Evacuados no momento deve ser um número inteiro!',
                    'number.min': 'Evacuados no momento não pode ser menor que 0!'
                }),
                evacuated: Joi.number().integer().min(0).messages({
                    'number.integer': 'Evacuados deve ser um número inteiro!',
                    'number.min': 'Evacuados não pode ser menor que 0!'
                }),
            })
        ),

        // Revisar os nomes tempo e subtempo
        weathers: Joi.array().items(
            Joi.object().keys({
                weather: Joi.string().regex(/^[A-Z]{3,6}$/).when(
                    'subweather',
                    {
                        is: Joi.exist(),
                        then: Joi.required().messages({
                            'any.required': 'É necessário informar a situação principal do tempo!'
                        })
                    }
                ).messages({
                    'string.pattern': 'Código de tempo inválido!',
                    'string.empty': 'Tempo não pode ser vazio'
                }),
                subWeather: Joi.string().regex(/^[A-Z]{3,6}$/).messages({
                    'string.pattern': 'Código de subtempo inválido!',
                    'string.empty': 'Subtempo não pode ser vazio!'
                })
            })
        ),

        //Coord
        position: Joi.string().required().messages({
            'string.required': 'É necessário informar a coordenada'

        }),
        assoc_contribution: Joi.number().integer().min(1).messages({
            'number.integer': 'Id da contribuição associada deve ser inteiro!',
            'number.min': 'Id da contribuição associada não pode ser menor que 1!',
            'number.empty': 'Id da contribuição associada não pode ser vazio!'
        }),
        added_by: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id do gerente deve ser inteiro!',
            'number.min': 'Id do gerente não pode ser menor que 1!',
            'number.empty': 'Id do gerente não pode ser vazio!',
            'any.required': 'Id do gerente é obrigatório!',
        })

        // Ainda faltam os anexos
    });
}

module.exports = { createValidate };

// Adicionar validação de empty em todos
