const router = require("express").Router();
const { institute_controller } = require("../controllers");
const { limiter } = require("../libs/constants/server_constants");
router.post("/",  institute_controller.add_institute);
router.patch("/:institute_id", institute_controller.update_institute);
router.delete("/:institute_id", institute_controller.delete_institute);
module.exports = router;