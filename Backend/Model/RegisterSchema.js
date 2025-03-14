const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPatient: {
      type: Boolean,
      default: false
    },
    isInsurer: {
      type: Boolean,
      default: false
    },
    claims: [{ type: mongoose.Schema.Types.ObjectId, ref: "Claim" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", RegisterSchema);