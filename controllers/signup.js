const User = require("../models/User");
const { createSecretToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports = {
  //login route
  async createUser(req, res) {
    try {
      //checking if we have recieved all the inputs
      if (!(req.body.username && req.body.email && req.body.password)) {
        res.status(400).json({
          message: "All input is required",
        });
      }

      //if all field are there , we check if the user already exists
      const oldUser = await User.findOne({ email: req.body.email });

      // if the user already exists we redirect them to login page
      if (oldUser) {
        return res.status(409).redirect("/auth/login");
      }

      //if the old user doesnt exist, we can hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //now creating the user
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //saving the user to the database
      const user = await newUser.save();

      //now we create a unique token using the mongo assigend unique _id property
      const token = createSecretToken(user._id);

      //sending that token as a cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
      });

      console.log("cookie set successfully");

      res.json(user);
    } catch (error) {
      console.log("Error signing up", error);
    }
  },
};
