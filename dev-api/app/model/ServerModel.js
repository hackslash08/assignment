const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  fullName: { type: String },
  userName: {type:String},
  amountWithdrawn:{type:Number},
  created:{type:Date},
  taxPaid:{type:Number, default:0}
 
  
});
const ServerModel = mongoose.model("Server", Schema);
module.exports = ServerModel;
