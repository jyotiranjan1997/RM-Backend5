const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };
