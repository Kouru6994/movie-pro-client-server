const Joi = require('joi');
const validatorHandler = require('../middleware/validatorHandler');

const register = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string()
            .trim()
            .min(3)
            .max(50)
            .required(),
        user_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        no_hp: Joi.string()
            .trim()
            .pattern(new RegExp('^[0-9]{10,15}$'))
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
}

const login = (req, res, next) => {
    const schema = Joi.object().keys({
        user_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    })
    validatorHandler(req, res, next, schema)
}


module.exports = {
    register,
    login
};