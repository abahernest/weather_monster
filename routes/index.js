const express = require('express')
const app =express()
const citiesRouter = require("../modules/cities/router");
const tempRouter = require("../modules/temperatures/router")
const forecastRouter = require("../modules/forecasts/router")

// routes
app.use('/cities', citiesRouter);
app.use('/temperatures', tempRouter)
app.use('/forecasts', forecastRouter)


module.exports = app;