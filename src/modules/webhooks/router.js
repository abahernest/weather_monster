const router = require("express").Router();
const {
  createHook,
  deleteHook
} = require("./controller/webhookController");


router.post(
  "/",
  createHook
);

router.delete(
  "/:id",
  deleteHook
);
module.exports = router;