const app = require("../../../app")
require('dotenv').config;
const supertest = require('supertest')
const request = supertest(app)
const cityModel = require("../../models").City
const temperatureModel = require("../../models").Temperature;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const city;

beforeAll(async () => {
    city = await cityModel.create({name:"Berlin",latitude:1.45,longitude:2.45})    
},30000)

afterAll (async ()=>{
    await sequelize.drop()
    console.log("Destroyed test db...")
},30000)

describe ("Record Temperature", ()=>{
    describe ("Test Status Code", ()=>{
        test ('Should return 404 for wrong city_id', async() => {
                    await request.post('/temperatures')    
                    .send(
                      {
                      "city_id":100,
                      "min":12,
                      "max":30
                      }
                    )    
                    .expect(404)
        },30000)
        test ("It should return 200", async()=>{
            await request.post('/temperatures')
            .send(
              {
              "city_id": city.id,
              "min":12,
              "max":30
              }
            ) 
            .expect(200)
        })
     
    })
    
    describe ("Test Response", ()=>{
        test ('Should return Not Found Message', async() => {
            const res = await request.post('/temperatures')
            .send(
              {
              "city_id":100,
              "min":12,
              "max":30
              }
            ) 
            expect(res.data.message).toEqual("City Not Found")
        },30000)

        test ("should return Success Message", async()=>{
                const res = await request.get('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                expect(res.data.message).toEqual("Success")
        })
    })

    describe ("Test Response Data", ()=>{
        test ('Should return Correct Min', async() => {
                const res = await request.post('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                expect(res.data.data.min).toEqual(12)
        },30000)
        test ("It should return correct Max", async()=>{
                const res = await request.post('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                expect(res.data.data.max).toEqual(30)
              })
        })

})
