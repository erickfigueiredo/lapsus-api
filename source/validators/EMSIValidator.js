const Joi = require('joi');

const createValidate = () => {
    return Joi.object().min(1).keys({
        
        position: Joi.string().regex(/^(POINT\s\(-{0,1}[0-9]{1,2}.[0-9]{6,20} -{0,1}[0-9]{1,2}.[0-9]{6,20}\)|LINESTRING\s\((-{0,1}[0-9]{1,2}.[0-9]{6,20} -{0,1}[0-9]{1,2}.[0-9]{6,20},)+-{0,1}[0-9]{1,2}.[0-9]{6,20} -{0,1}[0-9]{1,2}.[0-9]{6,20}\)|POLYGON\s\(\((-{0,1}[0-9]{1,2}.[0-9]{6,20} -{0,1}[0-9]{1,2}.[0-9]{6,20},)+-{0,1}[0-9]{1,2}.[0-9]{6,20} -{0,1}[0-9]{1,2}.[0-9]{6,20}\)\))$/)
        .when('egeo', {
            is: Joi.exist(),
            then: Joi.required().messages({
                'any.required': 'É obrigatório informar as coordenadas quando egeo é informado!'
            })
        })
        .messages({
            'string.pattern.base': 'Formato de coordenada inválido!',
            'string.empty': 'Coordenada não pode ser vazio!',
        }),

        event: Joi.object().min(1).keys({
            certainty: Joi.number().integer().min(0).max(100).messages({
                'number.integer': 'Probabilidade de Ocorrência deve ser um número inteiro!',
                'number.min': 'Probabilidade não pode ser menor que 0!',
                'number.max': 'Probabilidade não pode ser maior que 100!',
                'number.empty': 'O campo probabilidade não pode ser vazio!'
            }),
            //momento da Identificação
            decl_datime: Joi.date().max('now').messages({
                'date.max': 'Momento da identificação não pode ser no futuro!',
                'date.empty': 'O campo momento da identificação não pode ser vazio!'
            }),
            //momento da occorência
            occ_time: Joi.date().max('now').messages({
                'date.max': 'Momento da ocorrência não pode ser no futuro!',
                'date.empty': 'O campo momento da ocorrência não pode ser vazio!'
            }),
            freetext: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).messages({
                'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
                'string.min': 'Descrição do evento não pode ter menos que 3 caracteres!',
                'string.max': 'Descrição do evento não pode ter mais que 500 caracteres!',
                'string.empty': 'O campo descrição do evento não pode ser vazio!'
            }),
            scale: Joi.number().integer().min(1).max(5).messages({
                'number.integer': 'Escala deve ser um número inteiro!',
                'number.min': 'Escala não pode ser menor que 1!',
                'number.max': 'Escala não pode ser maior que 5!',
                'number.empty': 'O campo escala não pode ser vazio!'
            }),

            risk_assessmnt: Joi.string().regex(/^[A-Z]{1,10}$/).messages({
                'string.pattern.base': 'O formato código de risco é inválido!',
                'string.empty': 'O campo de risco não pode ser vazio!'
            }),
            status: Joi.string().regex(/^[A-Z]{1,10}$/).messages({
                'string.pattern.base': 'O formato do código de status é inválido!',
                'string.empty': 'O campo status não pode ser vazio!'
            }),
            cause: Joi.string().regex(/^[A-Z]{1,10}$/).messages({
                'string.pattern.base': 'O formato do código de causa é inválido!',
                'string.empty': 'O campo de causa não pode vazio!'
            })
        }).messages({
            'object.min': 'Evento deve ter no mínimo 1 atributo!'
        }),

        context: Joi.object().min(1).keys({
            freetext: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).required().messages({
                'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
                'string.min': 'Descrição do contexto não pode ter menos que 3 caracteres!',
                'string.max': 'Descrição do contexto não pode ter mais que 500 caracteres!',
                'string.empty': 'O campo descrição do contexto não pode ser vazio!',
                'any.required': 'Tipo de evento é obrigatório!'
            }),
            urgency: Joi.string().regex(/^(URGENT|NOT_URGENT)$/).messages({
                'string.pattern.base': 'Campo de urgência deve ser URGENT ou NOT_URGENT!',
                'string.empty': 'O campo urgência não pode ser vazio!'
            }),
        }).messages({
            'object.min': 'Contexto deve conter no mínimo 1 atributo!'
        }),

        egeo: Joi.object().min(1).keys({
            datime: Joi.date().max('now').messages({
                'date.max': 'Momento da declaração de vítimas não pode ser no futuro!',
                'date.empty': 'Momento da declaração de vítimas não pode ser vazio'
            }),
            type: Joi.string().regex(/^[A-Z]{1,10}$/).messages({
                'string.pattern.base': 'Código de tipo inválido!',
                'string.empty': 'Tipo não pode ser vazio'
            }),
            subtype: Joi.string().regex(/^[A-Z]{1,10}$/).messages({
                'string.pattern.base': 'Código de subtipo inválido!',
                'string.empty': 'Subtipo não pode ser vazio!'
            }),
            freetext: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).messages({
                'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
                'string.min': 'Descrição do contexto não pode ter menos que 3 caracteres!',
                'string.max': 'Descrição do contexto não pode ter mais que 500 caracteres!',
                'string.empty': 'O campo descrição do contexto não pode ser vazio!'
            }),
        }).when('weathers', {
            is: Joi.exist(),
            then: Joi.required().messages({
                'any.required': 'Egeo é obrigatório quando Weathers é informado!'
            })
        }).and('type', 'subtype').messages({
            'object.min': 'Egeo deve conter no mínimo 1 atributo!',
            'object.and': 'Tipo e Subtipo da área devem ser informados juntos!'
        }),

        casualties: Joi.array().min(1).items(
            Joi.object().keys({
                context: Joi.string().regex(/^[A-Z_]{1,15}$/).required().messages({
                    'string.pattern.base': 'Código de situação das vítimas inválido!',
                    'string.empty': 'O campo de contexto das vítimas não pode ser vazio!',
                    'any.required': 'É necessário informar a situação das vítimas!'
                }),
                datime: Joi.date().max('now').messages({
                    'date.max': 'Momento da declaração de vítimas não pode ser no futuro!',
                    'date.empty': 'Momento da declaração de vítimas não pode ser vazio'
                }),
                triagered: Joi.number().integer().min(0).messages({
                    'number.integer': 'O campo vítimas em extrema urgência deve ser um número inteiro!',
                    'number.min': 'O campo vítimas em extrema urgência não pode ser menor que 0!',
                    'number.empty': 'O campo vítimas em extrema urgência não pode ser vazio!'
                }),
                triageyellow: Joi.number().integer().min(0).messages({
                    'number.integer': 'O campo vítimas em urgência deve ser um número inteiro!',
                    'number.min': 'O campo vítimas em urgência não pode ser menor que 0!',
                    'number.empty': 'O campo vítimas em urgência não pode ser vazio!'
                }),
                triagegreen: Joi.number().integer().min(0).messages({
                    'number.integer': 'O campo de feridos deve ser um número inteiro!',
                    'number.min': 'O campo de feridos não pode ser menor que 0!',
                    'number.empty': 'O campo de feridos não pode ser vazio!'
                }),
                triageblack: Joi.number().integer().min(0).messages({
                    'number.integer': 'O campo de óbitos deve ser um número inteiro!',
                    'number.min': 'O campo de óbitos não pode ser menor que 0!',
                    'number.empty': 'O campo de óbitos não pode ser vazio!'
                }),
                missing: Joi.number().integer().min(0).messages({
                    'number.integer': 'O campo de desaparecidos deve ser um número inteiro!',
                    'number.min': 'O campo de desaparecidos não pode ser menor que 0!',
                    'number.empty': 'O campo de desaparecidos não pode ser vazio!'
                })
            })
        ).messages({
            'array.min': 'Array de Vítimas deve conter no mínimo 1 item!'
        }),

        actors: Joi.array().min(1).items(
            Joi.object().keys({
                actor: Joi.string().regex(/^[A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de entidade inválido!',
                    'string.empty': 'Entidade não pode ser vazio!',
                    'any.required': 'É necessário informar a entidade base!'
                }),
                actornv2: Joi.string().regex(/^[0-9A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de entidade nível 2 inválido!',
                    'string.empty': 'Entidade nível 2 não pode ser vazia!',
                    'any.required': 'É necessário informar a entidade nível 2!'
                }),
                actornv3: Joi.string().regex(/^[0-9A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de entidade nível 3 inválido',
                    'string.empty': 'Entidade nível 3 não pode ser vazia!',
                    'any.required': 'É necessário informar a entidade nível 3!'
                })
            })
        ).messages({
            'array.min': 'Array de Entidades deve conter no mínimo 1 item!'
        }),

        weathers: Joi.array().min(1).items(
            Joi.object().keys({
                weather: Joi.string().regex(/^[A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de clima inválido!',
                    'string.empty': 'Clima não pode ser vazio',
                    'any.required': 'Tipo de clima é necessário!'
                }),
                subweather: Joi.string().regex(/^[A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de subclima inválido!',
                    'string.empty': 'Subclima não pode ser vazio!',
                    'any.required': 'Tipo de subclima é necessário!'
                })
            })
        ).messages({
            'array.min': 'Array de Clima deve conter pelo menos 1 item!'
        }),

        loctypes: Joi.array().min(1).items(
            Joi.object().keys({
                loctype: Joi.string().regex(/^[A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de tipo de local inválido!',
                    'string.empty': 'Tipo de local não pode ser vazio!',
                    'any.required': 'Tipo de local é necessário!'
                }),
                subloctype: Joi.string().regex(/^[A-Z]{1,10}$/).required().messages({
                    'string.pattern.base': 'Código de sublocal inválido!',
                    'string.empty': 'Tipo de sublocal não pode ser vazio!',
                    'any.required': 'Tipo de sublocal é necessário!'
                })
            })
        ).messages({
            'array.min': 'Array de Loctypes deve conter pelo menos 1 item!'
        }),

        evacs: Joi.array().min(1).items(
            Joi.object().min(1).keys({
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
            }).messages({
                'object.min': 'Cada formulário de evacuados deve conter ao menos uma informação!'
            })
        ).messages({
            'array.min': 'Array de evacs deve conter pelo menos 1 item!'
        }),

        desc_external_infos: Joi.array().min(1).items(
            Joi.object().keys({
                freetext: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).required().messages({
                    'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
                    'string.min': 'Descrição do arquivo não pode ter menos que 3 caracteres!',
                    'string.max': 'Descrição do arquivo não pode ter mais que 500 caracteres!',
                    'string.empty': 'O campo descrição do arquivo não pode ser vazio!',
                    'any.required': 'Descrição do arquivo é obrigatória!'
                }),
                index_file: Joi.number().integer().min(0).required().messages({
                    'number.integer': 'Índice de arquivo deve ser inteiro!',
                    'number.min': 'Índice de arquivo não pode ser menor que 0!',
                    'number.empty': 'Índice do arquivo não pode ser vazio!',
                    'any.required': 'Índice de arquivo é obrigatório!'
                })
            })
        ).messages({
            'array.min': 'Array de informações do arquivo deve conter pelo menos 1 item!'
        }),

        id_contribution: Joi.number().integer().min(1).messages({
            'number.integer': 'Id da contribuição associada deve ser inteiro!',
            'number.min': 'Id da contribuição associada não pode ser menor que 1!',
            'number.empty': 'Id da contribuição associada não pode ser vazio!'
        }),
    }).messages({
        'object.min': 'O registro não pode ser vazio!'
    });
}

module.exports = { createValidate };
