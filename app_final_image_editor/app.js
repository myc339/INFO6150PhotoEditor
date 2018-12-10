const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controller/UserController");
const ImagebankController=require("./controller/ImagebankController");
const cors = require('cors');
// db instance connection
require("./config/db");

const app = express();
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://localhost:3301'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));
const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app
  .route("/users")
  .get(taskController.listAllUsers);
  
  app
  .route("/registration")
  .post(taskController.createNewUser);
app
  .route("/users/:usersId")
  .get(taskController.readUser)
  .put(taskController.updateUser)
  .delete(taskController.deleteUser);
app
  .route("/authentication")
  .get(taskController.authenticate);
  app
.route("/Imagebank")
.get(ImagebankController.listAllImage);
app
.route("/Imagebank/Save")
.post(ImagebankController.AddNewImage);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});