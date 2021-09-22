const router = require("express").Router();
const {
  addTemperatures
} = require("./controller/tempController");


//user logs in
router.post(
  "/",
  addTemperatures
);

module.exports = router;