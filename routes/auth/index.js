const router = require("express").Router();

const signupRoute = require("./signupRoute");
const loginRoute = require("./loginRoute");

router.use("/login", loginRoute);
router.use("/signup", signupRoute);

module.exports = router;
