const pgClient = require("./db")
const app = require('./app');
const port = process.env.PORT;

// Connects to PostgreSQL
pgClient.connect();


app.listen(port,()=>{
    console.log("Started server at port",port)
});
