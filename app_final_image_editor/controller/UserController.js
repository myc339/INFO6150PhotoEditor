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
  let newUser = new User(req.body);
  
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
    req.params.usersId ,
    req.body,
    { new: true },
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