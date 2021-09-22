const router = require("express").Router();
const {
  makeForecast
} = require("./controller/forecastController");


//user logs in
router.get(
  "/:city_id",
  makeForecast
);

module.exports = router;