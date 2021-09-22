const express = require('express')
const app =express()
const citiesRouter = require("../modules/cities/router");

// routes
app.use('/cities', citiesRouter);

module.exports = app;