const router = require("express").Router();
const authRoutes = require("./auth");

router.use("/auth", authRoutes);

router.use("/", (req, res) => {
  res.send(
    "Test the endpoints '/auth/login' and '/auth/signup' via postman or insomania"
  );
});

module.exports = router;
