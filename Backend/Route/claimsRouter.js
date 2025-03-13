const express = require("express");
const Claim = require("../Model/ClaimSchema"); 
const Register = require("../Model/RegisterSchema"); 
const mongoose = require("mongoose");

const claimsRouter = express.Router();

/**
 * @route   POST /api/claims
 * @desc    Submit a new claim
 * @access  Public
 */
claimsRouter.post("/claims", async (req, res) => {
  try {
    const { name, email, amount, description, files } = req.body;

    console.log("Received Data:", req.body); // Debugging

    if (!name || !email || !amount || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user by email
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new claim
    const newClaim = new Claim({
      name,
      email,
      amount,
      description,
      files: files || [],
      user: user._id,
    });

    // Save claim
    await newClaim.save();

    // Link claim to user
    user.claims.push(newClaim._id);
    await user.save();

    res.status(201).json({ message: "Claim submitted successfully", claim: newClaim });
  } catch (error) {
    console.error("Error submitting claim:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @route   GET /api/claims/:id
 * @desc    Get a claim by ID
 * @access  Public
 */
claimsRouter.get("/claims/:id", async (req, res) => {
  try {
    const claimId = req.params.id;
    console.log("Fetching Claim ID:", claimId); // Debugging

    // Validate if claimId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(claimId)) {
      console.log("Invalid Claim ID format.");
      return res.status(400).json({ message: "Invalid Claim ID format" });
    }

    // Find the claim by ID and populate the user details
    const claim = await Claim.findById(claimId).populate("user", "name email");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(claim);
  } catch (error) {
    console.error("Error fetching claim:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = claimsRouter;
