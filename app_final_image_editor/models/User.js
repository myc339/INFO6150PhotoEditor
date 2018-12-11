const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const UserSchema = new Schema({
  account: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("users", UserSchema);