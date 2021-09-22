const express = require('express');
const routes = require("./src/routes");
const morgan = require("morgan")

var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))


app.use("/", routes);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization, Observe");
  next();
});


module.exports = app;