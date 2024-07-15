const router = require("express").Router();
const { login } = require("../../controllers/login");

// auth/login
router.route("/").get(login);

module.exports = router;
