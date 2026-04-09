import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/image_bg.png";
import Footer from "./Footer";
import { auth } from "../firebase"; // Make sure this path is correct
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { API_ENDPOINTS } from "../config";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isPatient: false,
    isInsurer: false,
    role: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const redirectTimeout = React.useRef(null);

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
      setSuccess("");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Account created successfully! Redirecting...");
        setError("");
        localStorage.setItem("username", formData.name);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("isInsurer", formData.isInsurer);
        localStorage.setItem("isPatient", formData.isPatient);
        redirectTimeout.current = setTimeout(() => {
          window.location.href = '/Main';
        }, 1800);
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email || "";
      const isInsurerEmail = email.toLowerCase().includes("@aarogya") || email.toLowerCase().endsWith("aarogya.com");
      const googleUserData = {
        name: user.displayName || "",
        email: email,
        password: `google_${user.uid}`,
        isPatient: !isInsurerEmail,
        isInsurer: isInsurerEmail,
        googleUid: user.uid,
      };
      const response = await fetch(API_ENDPOINTS.googleAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleUserData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Account created successfully! Redirecting...");
        setError("");
        redirectTimeout.current = setTimeout(() => {
          window.location.href = '/Main';
        }, 1800);
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError(err.message);
    }
  };

  React.useEffect(() => {
    return () => {
      if (redirectTimeout.current) clearTimeout(redirectTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Minimal Navbar */}
      <nav className="w-full bg-[#23283b] border-b border-[#23283b] py-3 px-6 flex items-center justify-between">
        <Link to="/">
          <span className="font-serif italic font-bold text-white text-xl tracking-tight cursor-pointer">
            <span className="text-blue-400">AARO</span>GAYA
          </span>
        </Link>
        <Link to="/signin">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">Login</button>
        </Link>
      </nav>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
        <div className="flex-1 flex items-center justify-center mb-12">
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-center mb-6 text-gray-900">Create your account</h2>
            {success && (
              <div className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded px-4 py-2 text-center font-semibold">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 text-center font-semibold">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
              required
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
              required
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Role</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={formData.role === "patient"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">Patient</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="insurer"
                  checked={formData.role === "insurer"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">Insurer</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow"
          >
            Register
          </button>
        </form>
        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-800 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow"
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>
        <p className="text-center text-gray-700 mt-6">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline font-semibold">Sign in here</a>
        </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}