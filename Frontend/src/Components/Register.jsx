import { useState } from "react";
import React from "react";
import bgImage from "../assets/image_bg.png";
// import { useNavigate } from "react-router-dom";
// import Main from "./Patient/Main";
// import { Link } from "react-router-dom";



export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Email validation for insurers
    if (name === "email" && formData.role === "insurer") {
      if (!value.endsWith("@AAROGA")) {
        setError("Insurers must use an @AAROGA email.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.role === "insurer" && !formData.email.endsWith("@AAROGYA")) {
      setError("Insurers must use an @AAROGYA email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully");
        window.location.href = '/Main';
        
      } else {
        setError({ api: data.message });
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    console.log("Form Submitted", formData);
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

          {/* Continue with Google Button */}
          <button
            type="button"
            className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition mt-2 flex items-center justify-center space-x-2 shadow-md"
          >
            <img
              src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>
        </form>
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
