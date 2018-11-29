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
//authenticate input against database
// UserSchema.methods.comparePassword = function(candidatePassword,cb) {
//     bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
//       if (err) return cb(err);
//         cb(null, isMatch);
//     });
//   }


// // hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   bcrypt.hash(this.password, this.saltRounds, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   });
// });
module.exports = mongoose.model("users", UserSchema);