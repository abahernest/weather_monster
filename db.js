const {Client} = require("pg")
require ("dotenv").config()

const {HOST,USER,DB_PORT,DB} = process.env
const client = new Client ({
    user:"postgres",
    host:"localhost",
    port:5432,
    password:"root",
    database:"apiProjects"
})

module.exports =  client;