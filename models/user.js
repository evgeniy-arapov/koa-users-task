const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  displayName: String
}, {
  timestamps: true
});

userSchema.statics.publicFields = ["email", "displayName", "_id"];

module.exports = mongoose.model("User", userSchema);