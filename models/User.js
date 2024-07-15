const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = model("user", userSchema);

module.exports = User;
