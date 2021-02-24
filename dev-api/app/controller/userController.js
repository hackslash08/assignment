const user = require("../model/userModel"),
  jwt = require("jsonwebtoken");
var crypto = require("crypto");
const Token = require("../model/tokenVerification");
const fast2sms = require("fast-two-sms");

exports.userLogin = function(req, res, next) {
  user.findOne(
    { $and: [{ userName: req.body.userName }, { password: req.body.password }] },
    function(err, user) {
      if (!user)
        return res.status(401).send({
          msg:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      if (user.isVerified == false)
        return res.status(401).send({
          type: "not-verified",
          msg: "Your account has not been verified.",
        });
      res.send({ user: user.toJSON() });
    }
  );
};


exports.register = function(req, res, next) {
  
  user.findOne({ userName: req.body.userName }, function(err, userdata) {
    
    if (userdata)
      return res
        .status(400)
        .send({
          msg:
            "The email address you have entered is already associated with another account.",
        });
    var userObj = new user({
      fullName: req.body.fullName,
      userName: req.body.userName,
      company: req.body.company,
      password: req.body.password,
      role:req.body.role,
      salary:req.body.salary,
      created_at: new Date(),
    });
    userObj.save(function(err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      else{
        return res.status(200).send({success:true})
      }
      
      
    });
  });
};
exports.getUser=function(req, res) {
  // console.log(req.query.NAME);
  var man = { fullName: req.query.NAME };
  user.find(man)
    .then((data) => {
      // console.log({ data });
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

exports.editUsers=function(req, res) {
  user.update({ fullName: req.query.NAME }, req.body)
    .then((data) => {
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}


exports.getuserDetails = function(req, res) {
 
  user
    .find()
    .then((data) => {
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
};

require('dotenv').config();


