const config = require("./config/env"),
  mongoose = require("mongoose"),
  app = require("./config/express");
  const express = require("express");
  const user = require("./app/model/userModel");
const path = require("path");
const cron = require('node-cron');
var http = require("http");
var nStatic = require("node-static");
var fileServer = new nStatic.Server("./app/grantUploads");
// forms = require('./config/formHelper/initialForms');

//Connecting MongoDB using mongoose to our application
mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = global.Promise;
//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + config.db);
});

//Express application will listen to port mentioned in our configuration
app.listen(config.port, function (err) {
  if (err) throw err;
  console.log("App listening on port " + config.port);
});
http
  .createServer(function (req, res) {
    fileServer.serve(req, res);
  })
  .listen(3500);

  cron.schedule('0 0 1 * *', function(req, res) {
    console.log("reducing tax")
    user.updateMany({ amtWithdrawn: {$gt: 0} },
      { $set: { amtWithdrawn : 0,taxPaid: 0 }  }  ) .then((data) => {
        console.log(data);
        return true;
      })
      .catch((err) => {
        return false;
      });
      console.log("finished");
  });

