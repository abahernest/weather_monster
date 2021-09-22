const cityModel = require("../../../models").City
const temperatureModel = require("../../../models").Temperature
const { validateTempCreation } = require("../validation");



const controller = {

    async addTemperatures (req, res) {
        try {
            //Validate Request Body
            const {error} = validateTempCreation(req.body)
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
                return res.status(404).send({
                    status_code:404,
                    message:"City Not Found"
                })
            }
            //Create Temperature
            city = await temperatureModel.create(req.body)
            
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:{
                    id:city.id,
                    city_id:city.city_id,
                    max:city.max,
                    min:city.min,
                    timestamp:city.createdAt.getTime()
                }
            })

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                message: "Internal server error!",
                data: error.message,
                request: req.body
            });
        }
    }

}

module.exports = controller;