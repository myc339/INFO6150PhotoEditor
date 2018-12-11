const User = require("../models/User");


exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.createNewUser = (req, res) => {
  
  let newUser = new User();
   newUser.account=req.body.account;
     newUser.password=req.body.password;
    newUser.userName=req.body.userName;
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};

exports.readUser = (req, res) => {
  User.findById(req.params.usersId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  
  User.findOneAndUpdate(
    {_id:req.params.usersId,account:req.query.account},
   {$set:{password:req.query.password,userName:req.query.userName}},
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    }
  );
};
exports.authenticate = (req, res) => {
  User.findOne({account:req.query.account,password:req.query.password}, (err, user) => {
      
   
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
    
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete( req.params.usersId , (err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
};