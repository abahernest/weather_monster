const app = require("../../../app")
require('dotenv').config;
const supertest = require('supertest')
const request = supertest(app)
const cityModel = require("../../models").City
const temperatureModel = require("../../models").Temperature;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
let min=[12,15,14],max=[30,29,32];

beforeAll(async () => {
    const city = await cityModel.create({name:"Berlin",latitude:1.45,longitude:2.45})
    let temp=[
        {city_id:city.id,max:max[0],min:min[0]},
        {city_id:city.id,max:max[1],min:min[1]},
        {city_id:city.id,max:max[2],min:min[2]}
    ]
    await temperatureModel.bulkCreate(temp)      
},30000)

afterAll (async ()=>{
    await sequelize.drop()
    console.log("Destroyed test db...")
},30000)

describe ("Forecasts", ()=>{
    describe ("Test Status Code", ()=>{
        test ('Should return 404 for wrong city_id', async() => {
                    await request.get('/forecasts')        
                    .expect(404)
        },30000)
        test ("It should return 200", async()=>{
            await request.get('/forecasts')
            .expect(200)
        })
     
    })
    
    describe ("Test Response", ()=>{
        test ('Should return Not Found Message', async() => {
            const res = await request.get('/forecasts')
            expect(res.data.message).toEqual("No temperature data for this city")
        },30000)
        test ("should return Success Message", async()=>{
                const res = await request.get('/forecasts')
                expect(res.data.message).toEqual("Success")
        })
    })

    describe ("Test Calculation", ()=>{
        test ('Should return Correct Avg Min of 12,15,14', async() => {
                const res = await request.get('/forecasts')
                expect(res.data.data.min).toEqual(14)
        },30000)
        test ("It should return correct avg Max of 30,29,32", async()=>{
                const res = await request.get('/forecasts')
                expect(res.data.data.max).toEqual(30)
        })
        test ("It should return correct Sample of 3 items", async()=>{
            await request.get('/forecasts')
            expect(res.data.data.sample).toEqual(3)
        })
        test ("It should return correct Min, Max & Sample", async()=>{
            await request.get('/forecasts')
            expect(res.data.data.min).toEqual(14)
            expect(res.data.data.max).toEqual(30)
            expect(res.data.data.sample).toEqual(3)
        })        
    })
})





