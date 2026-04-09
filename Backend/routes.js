const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("./Model/RegisterSchema");
const User = require("./Model/LoginSchema");


const router = express.Router();
const JWT_SECRET = "your_secret_key";
//  Register Route
router.post("/register", async (req, res) => {
 try {
   const { name, email, password, isPatient, isInsurer, googleUid } = req.body;
   console.log(name, email, password, isPatient, isInsurer);


   // Check if user already exists
   const existingUser = await Register.findOne({ email });
   if (existingUser) {
     // If user exists and this is a Google login, return success with token
     if (googleUid) {
       const token = jwt.sign({ id: existingUser._id, email: existingUser.email, name: existingUser.name }, JWT_SECRET, {
         expiresIn: "1h",
       });
       return res.status(200).json({ 
         message: "Login successful",
         token,
         name: existingUser.name,
         isInsurer: existingUser.isInsurer,
         isPatient: existingUser.isPatient
       });
     }
     return res.status(400).json({ message: "User already exists" });
   }


   // **Validation for email based on role (skip for Google sign-in)**
   if (!googleUid) {
     if (isInsurer && !email.toLowerCase().includes("aarogya")) {
       return res.status(400).json({ message: "Insurers must have an AAROGYA email." });
     }
   }


   if(!isInsurer && !isPatient){
     return res.status(400).json({message: 'User must be either patient or insurer'});
   }


   // Hash the password (skip if empty for Google users)
   let hashedPassword = '';
   if (password) {
     const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(password, salt);
   } else if (googleUid) {
     // Generate a random password for Google users
     const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(`google_${googleUid}_${Date.now()}`, salt);
   } else {
     return res.status(400).json({ message: "Password is required" });
   }


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


   const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: "1h" });
   res.status(201).json({ 
     message: "User registered successfully!", 
     token, 
     name, 
     isPatient, 
     isInsurer 
   });
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
   const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, {
     expiresIn: "1h",
   });

   res.status(200).json({
     message: "Login successful",
     token,
     name: user.name,
     isInsurer: user.isInsurer,
     isPatient: user.isPatient
   });
 } catch (error) {
   res.status(500).json({ message: "Server error", error });
 }
});

//  Google Authentication Route (handles both login and registration)
router.post("/google-auth", async (req, res) => {
  try {
    const { name, email, googleUid, isPatient, isInsurer } = req.body;

    // Check if user already exists
    let user = await Register.findOne({ email });

    if (user) {
      // User exists - log them in
      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        name: user.name,
        isInsurer: user.isInsurer,
        isPatient: user.isPatient
      });
    }

    // User doesn't exist - register them
    if (!isInsurer && !isPatient) {
      return res.status(400).json({ message: 'User must be either patient or insurer' });
    }

    // Generate a secure password for Google users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(`google_${googleUid}_${Date.now()}`, salt);

    // Create new user
    const newUser = new Register({
      name,
      email,
      password: hashedPassword,
      isPatient: Boolean(isPatient),
      isInsurer: Boolean(isInsurer),
    });

    await newUser.save();

    // Generate token for new user
    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      name: newUser.name,
      isInsurer: newUser.isInsurer,
      isPatient: newUser.isPatient
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//  Protected Route Example (Requires JWT)
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

