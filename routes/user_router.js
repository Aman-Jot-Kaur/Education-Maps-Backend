const router = require("express").Router();
const { user_controller } = require("../controllers");
const userAuth = require("../middlewares/auth_middleware");
const { limiter } = require("../libs/constants/server_constants");
router.get("/:user_id", userAuth, user_controller.get_user_by_uuid);
router.post("/", limiter, user_controller.add_user);
router.post("/login", limiter, user_controller.login_user);
router.patch("/:user_id", user_controller.update_user);
module.exports = router;
