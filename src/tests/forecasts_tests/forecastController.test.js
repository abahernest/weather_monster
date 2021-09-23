const app = require("../../../app")
require('dotenv').config;
const supertest = require('supertest')
const request = supertest(app)
const cityModel = require("../../models").City
const temperatureModel = require("../../models").Temperature;
let min=[12,15,14],max=[30,29,32];
let city,temp;

beforeAll(async () => {
    city = await cityModel.create({name:"Berlin",latitude:1.45,longitude:2.45})
    temp=[
        {city_id:city.id,max:max[0],min:min[0]},
        {city_id:city.id,max:max[1],min:min[1]},
        {city_id:city.id,max:max[2],min:min[2]}
    ]
    temp = await temperatureModel.bulkCreate(temp)      
},30000)

afterAll (async ()=>{
    await city.destroy()
    await temperatureModel.sync({force:true})
       
    console.log("Destroyed test objects...")
},30000)

    describe ("Test Status Code", ()=>{
        test ('Should return 404 for wrong city_id', async() => {
                    await request.get('/forecasts/'+city.id*100)        
                    .expect(404)
        },30000)
        test ("It should return 200", async()=>{
            await request.get('/forecasts/'+city.id)
            .expect(200)
        })
     
    })
    
    describe ("Test Response", ()=>{
        test ('Should return Not Found Message', async() => {
            let res = await request.get('/forecasts/'+city.id*100)
            res = JSON.parse(res.text)
            expect(res.message).toEqual("No temperature data for this city")
        },30000)
        test ("should return Success Message", async()=>{
            let res = await request.get('/forecasts/'+city.id)
            res = JSON.parse(res.text)
            expect(res.message).toEqual("Success")
        })
    })

    describe ("Test Calculation", ()=>{
        test ('Should return Correct Avg Min of 12,15,14', async() => {
            let res = await request.get('/forecasts/'+city.id)
            res = JSON.parse(res.text)
            expect(res.data.min).toEqual(14)
        },30000)
        test ("It should return correct avg Max of 30,29,32", async()=>{
            let res = await request.get('/forecasts/'+city.id)
            res = JSON.parse(res.text)
            expect(res.data.max).toEqual(30)
        })
        test ("It should return correct Sample of 3 items", async()=>{
            let res = await request.get('/forecasts/'+city.id)
            res = JSON.parse(res.text)
            expect(res.data.sample).toEqual(3)
        })
        test ("It should return correct Min, Max & Sample", async()=>{
            let res = await request.get('/forecasts/'+city.id)
            res = JSON.parse(res.text)
            expect(res.data.min).toEqual(14)
            expect(res.data.max).toEqual(30)
            expect(res.data.sample).toEqual(3)
        })        
    })





