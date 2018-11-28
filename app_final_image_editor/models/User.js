const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", UserSchema);