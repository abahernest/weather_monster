const router = require("express").Router();
const {
  addTemperatures
} = require("./controller/tempController");


router.post(
  "/",
  addTemperatures
);

module.exports = router;