const express = require("express");
const Question = require("../Model/QuestionsSchema");
const Register = require("../Model/RegisterSchema");
const mongoose = require("mongoose");

const questionsRouter = express.Router();

/**
 * @route   POST /api/questions
 * @desc    Submit a new question
 * @access  Public
 */
questionsRouter.post("/questions", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Debugging log
    console.log("Received Data:", req.body);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user by email
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new question
    const newQuestion = new Question({
      name,
      email,
      subject,
      message,
      user: user._id,
    });

    // Save question
    await newQuestion.save();

    res.status(201).json({ message: "Question submitted successfully", question: newQuestion });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @route   GET /api/questions
 * @desc    Get all questions
 * @access  Public
 */
questionsRouter.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find().populate("user", "name email");
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @route   GET /api/questions/:id
 * @desc    Get a question by ID
 * @access  Public
 */
questionsRouter.get("/questions/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: "Invalid Question ID format" });
    }

    const question = await Question.findById(questionId).populate("user", "name email");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = questionsRouter;
