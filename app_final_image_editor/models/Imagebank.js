const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const ImagebankSchema = new Schema({
  
  img:{
    type:String,
    required:true,
    
    },
  // description:{
  //     type:String
  // },
  // title:{
  //     type:String,
  //     required:true
  // },
  // provider:{
  //     type:String,
  //     required:true
  // },
  createdOn: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Imagebank", ImagebankSchema);