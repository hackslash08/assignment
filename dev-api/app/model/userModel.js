const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    userName: { type: String, unique: true },
    isVerified: { type: Boolean, default: true},
    amtWithdrawn: { type: Number, default: 0},
    taxPaid:{type: Number, default:0},
    password: { type: String },
    passwordResetToken: String,
    passwordResetExpires: String,
    role: { type: String },
    salary:{type:Number},
    company: { type: String },
    amtAvailable: { type: Number, default:'' },
    created_at: { type: Date },
    // endContract: { type: String},
    fullName: { type: String },
    // lastName: { type: String },
})

const UserModel = mongoose.model('user', Schema)
module.exports = UserModel

