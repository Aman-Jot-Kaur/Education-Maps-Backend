const router = require("express").Router();
const { teaching_service_controller } = require("../controllers");
const { limiter } = require("../libs/constants/server_constants");
router.post("/", limiter, teaching_service_controller.add_teaching_service);
router.patch("/:service_id", limiter, teaching_service_controller.update_teaching_service);
router.delete("/:service_id", limiter,  teaching_service_controller.delete_teaching_service);
module.exports = router;
