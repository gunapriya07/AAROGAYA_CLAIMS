const express = require("express");
const Claim = require("../Model/ClaimSchema");
const Register = require("../Model/RegisterSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");


const claimsRouter = express.Router();


// 🛠️ Setup Multer Storage
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, "uploads/"); // Save files in the `uploads` folder
 },
 filename: (req, file, cb) => {
   cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
 },
});


const upload = multer({storage: storage});


/**
* @route   POST /api/claims
* @desc    Submit a new claim
* @access  Public
*/
claimsRouter.post("/claims", upload.array("files", 5), async (req, res) => {
 try {
   const { name, email, amount, description } = req.body;
   const files = req.files; // Get uploaded files


   console.log("Received Data:", req.body); // Debugging
   console.log("Uploaded Files:", files); // Debugging


   if (!name || !email || !amount || !description) {
     return res.status(400).json({ message: "All fields are required." });
   }


   // Find user by email
   const user = await Register.findOne({ email });


   if (!user) {
     return res.status(404).json({ message: "User not found" });
   }


   // Store file paths
   const fileUrls = files.map(file => file.path);


   // Create a new claim
   const newClaim = new Claim({
     name,
     email,
     amount,
     description,
     files: fileUrls, // Store file paths in the database
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


// fetch all claims
claimsRouter.get("/claims", async (req, res) => {
 try {
   const claims = await Claim.find(); // Fetch all claims
   res.status(200).json(claims);
 } catch (error) {
   console.error("Error fetching claims:", error);
   res.status(500).json({ message: "Server error", error });
 }
});




// Update the report based on id
claimsRouter.put("/claims/:id", upload.array("files", 5), async (req, res) => {
 try {
   const { id } = req.params;
   const { name, email, amount, description } = req.body;
   const files = req.files;


   console.log("Update Data:", req.body);
   console.log("Uploaded Files:", files);


   // Find the claim by ID
   const existingClaim = await Claim.findById(id);


   if (!existingClaim) {
     return res.status(404).json({ message: "Claim not found" });
   }


   // Update fields if provided
   if (name) existingClaim.name = name;
   if (email) existingClaim.email = email;
   if (amount) existingClaim.amount = amount;
   if (description) existingClaim.description = description;


   // If new files are uploaded, update the files field
   if (files.length > 0) {
     existingClaim.files = files.map(file => file.path);
   }


   // Save updated claim
   await existingClaim.save();


   res.status(200).json({ message: "Claim updated successfully", claim: existingClaim });
 } catch (error) {
   console.error("Error updating claim:", error);
   res.status(500).json({ message: "Server error", error });
 }
});


claimsRouter.patch("/claims/:id", upload.array("files", 5), async (req, res) => {
 try {
   const claimId = req.params.id;
   const { name, amount, description, status } = req.body;
   const files = req.files; // Get uploaded files


   console.log("Received Data:", req.body); // Debugging
   console.log("Uploaded Files:", files); // Debugging


   // Find the claim by ID
   const claim = await Claim.findById(claimId);
   if (!claim) {
     return res.status(404).json({ message: "Claim not found" });
   }


   // Update fields only if they exist in the request body
   if (name) claim.name = name;
   if (amount) claim.amount = amount;
   if (description) claim.description = description;
   if (status) claim.status = status;


   // Update files only if they are uploaded
   if (files && files.length > 0) {
     const fileUrls = files.map(file => file.path);
     claim.files = fileUrls;
   }


   // Save updated claim
   await claim.save();


   res.status(200).json({ message: "Claim updated successfully", claim });
 } catch (error) {
   console.error("Error updating claim:", error);
   res.status(500).json({ message: "Server error", error });
 }
});




module.exports = claimsRouter;


