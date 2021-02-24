const Server = require("../model/ServerModel");
var crypto = require("crypto");
function createNewServer(req, res) {
  // console.log(req.body);
  var payload = new Server({
    fullName: req.body.fullName,
    userName:req.body.userName,
    amountWithdrawn:req.body.amountWithdrawn,
    created:new Date(),
    taxPaid:req.body.taxPaid,
    
    
    
  });
  payload
    //saving the payload into the DB, that means the fields in the form will be saved into the database as a new project.
    .save(payload)
    .then((data) => {
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

//getting project list and details
// function getProjectList(req, res) {
//   project
//     .find()
//     .then((data) => {
//       return res.status(200).send({ success: true, data: data });
//     })
//     .catch((err) => {
//       return res.status(400).send({ success: false, data: err });
//     });
// }
function getServerList(req, res) {
  // console.log(req.query.NAME);
  var man = { fullName: req.query.NAME };
  Server.find(man)
    .then((data) => {
      // console.log({ data });
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

//Used during editing and viewing to fetch details of a particular project
function getServerDetail(req, res) {
  // console.log(req.query.id);
  var man = { _id: req.query.id };
  Server.find(man)
    .then((data) => {
      // console.log({ data });
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

//delete project code and details
function deleteServer(req, res) {
  // console.log(req.query);
  Server.deleteOne({ _id: req.query.id })
    .then((data) => {
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

//Edit project details
function editServer(req, res) {
  Server.update({ _id: req.query.id }, req.body)
    .then((data) => {
      return res.status(200).send({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
}

function uploadDoc(req, res) {
  console.log("Hello Image")
  if (req.files) {
    req.files.forEach(function (files, index, arr) {
      const token = crypto.randomBytes(16).toString("hex");
      var path = {
        doc_Id: token,
        file_name: files.originalname,
        type: files.mimetype,
        path: files.path,
        encoding: files.encoding,
        date: new Date(),
      };
      Server
        .update({ _id: req.query.id },  { documents: path } )
        .then((data) => {
          return res.status(200).send({ success: true, data: data });
        })
        .catch((err) => {
          return res.status(400).send({ success: false, data: err });
        });
    });
  }
};

module.exports = {
  uploadDoc,
  createNewServer,
  getServerDetail,
  getServerList,
  editServer,
  deleteServer,
};
