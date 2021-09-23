const app = require("../../../app")
require('dotenv').config;
const supertest = require('supertest')
const request = supertest(app)
const cityModel = require("../../models").City
let city;

beforeAll(async () => {
    city = await cityModel.create({name:"Berlin",latitude:1.45,longitude:2.45})    
},30000)

afterAll (async ()=>{
    await city.destroy()
    console.log("Destroyed test object...")
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
            let res = await request.post('/temperatures')
            .send(
              {
              "city_id":city.id*100,
              "min":12,
              "max":30
              }
            ) 
            res = JSON.parse(res.text)
            expect(res.message).toEqual("City Not Found")
        },30000)

        test ("should return Success Message", async()=>{
                let res = await request.post('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                console.log("res",res)
                res = JSON.parse(res.text)
                expect(res.message).toEqual("Success")
        })
    })

    describe ("Test Response Data", ()=>{
        test ('Should return Correct Min', async() => {
                let res = await request.post('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                res = JSON.parse(res.text)
                expect(res.data.min).toEqual(12)
        },30000)
        test ("It should return correct Max", async()=>{
                let res = await request.post('/temperatures')
                .send(
                  {
                  "city_id":city.id,
                  "min":12,
                  "max":30
                  }
                ) 
                res = JSON.parse(res.text)
                expect(res.data.max).toEqual(30)
              })
        })

})
