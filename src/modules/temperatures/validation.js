const Joi = require('joi');

exports.validateTempCreation = (temp) => {
    const schema = Joi.object(
    {
        city_id: Joi.number().integer().required(),
        max: Joi.number().required(),
        min: Joi.number().required()
    })
    return schema.validate(temp);
}