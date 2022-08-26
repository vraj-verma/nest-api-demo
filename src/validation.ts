import * as Joi from 'joi';

export class UserValidateSchema {
    static validateUser = Joi.object({
        name: Joi.string().required().min(3),
        email:Joi.string().email().required(),
        phone:Joi.number().min(10).optional()
    });

    static updateUser = Joi.object({
        name:Joi.string().min(2).optional(),
        email:Joi.string().email().optional()
    });

    static querySchema = Joi.object({
        limit:Joi.number().default(10),
        offset:Joi.number().default(0),
    });

    static querySchema2 = Joi.object({
        name:Joi.string().min(3),
        age:Joi.number().integer()
    })

}