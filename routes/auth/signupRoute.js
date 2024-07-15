const router = require("express").Router();
const { createUser } = require("../../controllers/signup");

// auth/signup
router.route("/").post(createUser);

module.exports = router;
