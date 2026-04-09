const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String },
    profileImage: { type: String }, // URL or path to image
    claimsHistory: [{
      id: String,
      date: Date,
      amount: Number,
      status: String
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
