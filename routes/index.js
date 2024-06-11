const router = require("express").Router();
router.use("/teaching-services", require("./teaching_service_router"));
router.use("/institutes", require("./institute_router"));
router.use("/users", require("./user_router"));
router.use("/reviews", require("./review_router"));
// router.use("/bookings", require("./booking_router"));
module.exports = router;
