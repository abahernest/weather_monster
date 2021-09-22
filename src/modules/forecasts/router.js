const router = require("express").Router();
const {
  makeForecast
} = require("./controller/forecastController");


router.get(
  "/:city_id",
  makeForecast
);

module.exports = router;