const Joi = require('joi');

exports.validateWebhookCreation = (webhook) => {
    const schema = Joi.object(
    {
        city_id: Joi.number().integer().required(),
        callback_url: Joi.string().uri().required()
    })
    return schema.validate(webhook);
}