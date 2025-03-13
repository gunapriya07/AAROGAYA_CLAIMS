const mongoose = require("mongoose");

const ClaimsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true }, // User's email
    amount: { type: Number, required: true }, // Claim amount
    description: { type: String, required: true }, // Description of the claim
    files: [{ type: String }], // Array of file URLs or file paths
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Status of the claim
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Register", required: true }, // Reference to RegisterSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", ClaimsSchema);
