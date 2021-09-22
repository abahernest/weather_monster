const router = require("express").Router();
const {
  createCity, 
  editCity, 
  deleteCity
} = require("./controller/citiesController");


router.post(
  "/",
  createCity
);

router.patch(
  "/:id",
  editCity
);

router.delete(
  "/:id",
  deleteCity
);

module.exports = router;