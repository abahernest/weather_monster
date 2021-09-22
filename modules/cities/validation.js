const Joi = require('joi');

exports.validateCreateCities = (cities) => {
    const schema = Joi.object(
    {
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    })
    return schema.validate(cities);
}