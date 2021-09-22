const cityModel = require("../../../models").City
const { validateWebhookCreation } = require('../validation');
const webhookModel = require("../../../models").Webhooks



const controller = {

    async createHook (req, res) {
        try {
            //Validate Request Body
            const {error} = validateWebhookCreation(req.body)
            if (error){
                return res.status(400).send({
                    status_code:400,
                    message:error.details[0].message
                })
            }
            let {city_id} = req.body           

            //Verify city_id
            let city = await cityModel.findOne ({
                where: {id:city_id}
            })
            if (city==null){
                return res.status(400).send({
                    status_code:400,
                    message:"City not found"
                })
            }

            //Create Webhook
            let hook = await webhookModel.create(req.body)
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:{
                    id:hook.id,
                    city_id:hook.city_id,
                    callback_url:hook.callback_url}
            })

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                message: "Internal server error!",
                data: error.message,
                request: req.body
            });
        }
    },

    async deleteHook (req, res) {
        try {
            let hookId = req.params.id

            //Find Webhook
            let hook = await webhookModel.findOne ({
                where: {id:hookId}
            })
            if (hook == null){
                return res.status(404).send({
                    status_code:404,
                    message:"Not Found"
                })
            }
            
            //Update City
            await hook.destroy()
            
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:{
                    id:hook.id,
                    city_id:hook.city_id,
                    callback_url:hook.callback_url}
            })

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                message: "Internal server error!",
                data: error.message,
                request: req.body
            });
        }
    },    

}

module.exports = controller;