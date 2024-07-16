const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/generateToken");

module.exports = {
  //login route
  async login(req, res) {
    try {
      //destructuring the email and password first
      const { email, password } = req.body;

      //making sure we have received the inputs
      if (!(email && password)) {
        return res.status(400).json({
          message: "All inputs are required",
        });
      }

      //now we check to see if the user exists in our database
      const user = await User.findOne({ email });

      // also at the same time, we try compare the provided password as well
      const validPassword = await bcrypt.compare(password, user.password);

      //if either of user or valid password check fails, we send the invalid credentials msg
      if (!(user && validPassword)) {
        return res.status(404).json({
          message: "Invalid credentials",
        });
      }

      //now if the user exists and also password matches, we create a token
      const token = createSecretToken(user._id);

      //sending that token in the cookie
      res.cookie("token", {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      });

      res.json({ token });
    } catch (error) {
      console.log("Error logging in", error);
    }
  },
};
