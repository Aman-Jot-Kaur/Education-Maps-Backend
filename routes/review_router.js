const router = require("express").Router();
const { review_controller } = require("../controllers");
const { limiter } = require("../libs/constants/server_constants");
router.post("/",  review_controller.add_review);
router.get("/",  review_controller.get_review);
module.exports = router;