const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo:{ type: Number, required: true,unique: true },
  name: { type: String, required: true },
  phoneOtp:{type:String},
});


const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;