const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Register" }, // Reference to the user who submitted the question
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionsSchema);
