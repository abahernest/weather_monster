const temperatureModel = require("../../../models").Temperature

const controller = {

    async makeForecast (req, res) {
        try {           
            let {city_id} = req.params        
            
            let temperatures = await temperatureModel.findAll ({
                where: {city_id:city_id}
            })
            const count = temperatures.length
            if (count<1){
                return res.status(404).send({
                    status_code:404,
                    message:"No temperature data for this city",
                    data:{}
                })
            }
            
            let minSum=0,maxSum=0;
            temperatures.forEach(item=>{
                minSum+=item.min
                maxSum+=item.max
            })

            return res.status(200).send({
                status_code:200,
                message:"Success",
                data:{
                    city_id:city_id,                    
                    max:Math.round((maxSum/count)),
                    min:Math.round((minSum/count)),
                    sample:count
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
    },

}

module.exports = controller;