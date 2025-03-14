const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("./Model/RegisterSchema"); 
const User = require("./Model/LoginSchema");

const router = express.Router();
const JWT_SECRET = "your_secret_key";
// ✅ Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isPatient, isInsurer } = req.body;
    console.log(name, email, password, isPatient, isInsurer);

    // Check if user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // **Validation for email based on role**
    if (isInsurer && !email.toLowerCase().endsWith("@aarogya.com")) {
      return res.status(400).json({ message: "Insurers must have an @AAROGYA.com email." });
    }
    if (isPatient && !email.toLowerCase().endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Patients must have a @gmail.com email." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Register({
      name,
      email,
      password: hashedPassword,
      isPatient: Boolean(isPatient),
      isInsurer: Boolean(isInsurer),
    });

    console.log("newUser ", newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userDetails: { name, email, isPatient, isInsurer } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists in the database
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Protected Route Example (Requires JWT)
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify token
    const verified = jwt.verify(token, JWT_SECRET);
    const user = await Register.findById(verified.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
});

module.exports = router;