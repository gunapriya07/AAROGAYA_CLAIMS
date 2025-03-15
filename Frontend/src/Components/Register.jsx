import { useState } from "react";
import React from "react";
import bgImage from "../assets/image_bg.png";
import { auth } from "../firebase"; // Make sure this path is correct
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isPatient: false,
    isInsurer: false,
    role:""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
 
 
    if (name === "role") {
      updatedFormData = {
        ...updatedFormData,
        isPatient: value === "patient",
        isInsurer: value === "insurer"
      };
    }
 
 
    if (name === "email" && updatedFormData.role === "insurer") {
      if (!value.endsWith("@AAROGYA")) {
        setError("Insurers must use an @AAROGYA email.");
      } else {
        setError("");
      }
    }
    setFormData(updatedFormData);
  };
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.role === "insurer" && !formData.email.endsWith("@AAROGYA.com")) {
      setError("Insurers must use an @AAROGYA email.");
      return;
    }
 
 
    try {
      const response = await fetch("https://aarogaya-claims.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
 
 
      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully");
        localStorage.setItem("username", formData.name);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("isInsurer", formData.isInsurer);
        localStorage.setItem("isPatient", formData.isPatient);
        window.location.href = '/Main';

      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
 
 

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get user information from Google account
      const user = result.user;
      
      // Prepare data for your API
      const googleUserData = {
        name: user.displayName || "",
        email: user.email || "",
        password: "", // You might want to handle this differently for Google users
        role: formData.role, // Use the selected role from your form
        googleUid: user.uid,
      };
      
      // Register the user in your backend
      const response = await fetch("https://aarogaya-claims.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleUserData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully with Google");
        window.location.href = '/Main';
      } else {
        setError(data.message);
      }
      
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="flex justify-center items-center"
    >
      <div className="p-8 rounded-lg shadow-2xl shadow-black/50 w-full max-w-md bg-transparent backdrop-blur-lg border border-white border-opacity-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="flex space-x-4 mt-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === "patient"}
                onChange={handleChange}
                className="mr-2"
              />
              Patient
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="insurer"
                checked={formData.role === "insurer"}
                onChange={handleChange}
                className="mr-2"
              />
              Insurer
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        {/* Continue with Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition mt-4 flex items-center justify-center space-x-2 shadow-md"
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}