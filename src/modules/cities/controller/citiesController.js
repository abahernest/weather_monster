const cityModel = require("../../../models").City
const { validateCreateCities } = require('../validation');



const controller = {

    async createCity (req, res) {
        try {
            //Validate Request Body
            const {error} = validateCreateCities(req.body)
            if (error){
                return res.status(400).send({
                    status_code:400,
                    message:error.details[0].message
                })
            }
            let {name,latitude,longitude} = req.body
            name =name.toLowerCase()

            //Check for duplicate cities
            let city = await cityModel.findOne ({
                where: {name:name}
            })
            if (city){
                return res.status(400).send({
                    status_code:400,
                    message:"City already exists"
                })
            }
            //Create City
            city = await cityModel.create({
                name:name,
                latitude:latitude,
                longitude:longitude
            })
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:city
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


    async editCity (req, res) {
        try {
            //Validate Request Body
            const {error} = validateCreateCities(req.body)
            if (error){
                return res.status(400).send({
                    status_code:400,
                    message:error.details[0].message
                })
            }
            let cityId = req.params.id
            let {name,latitude,longitude} = req.body
            name =name.toLowerCase()

            //Check for duplicate cities
            let city = await cityModel.findOne ({
                where: {name:name}
            })
            if (city){
                return res.status(400).send({
                    status_code:400,
                    message:"Name already exists"
                })
            }

            //Find city
            city = await cityModel.findOne ({
                where: {id:cityId}
            })
            if (city == null){
                return res.status(404).send({
                    status_code:404,
                    message:"Not Found"
                })
            }
            
            //Update City
            await city.update({
                name:name,
                latitude:latitude,
                longitude:longitude
            })
            
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:city
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


    async deleteCity (req, res) {
        try {
            let cityId = req.params.id

            //Find city
            let city = await cityModel.findOne ({
                where: {id:cityId}
            })
            if (city == null){
                return res.status(404).send({
                    status_code:404,
                    message:"Not Found"
                })
            }
            
            //Update City
            await city.destroy()
            
            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:city
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