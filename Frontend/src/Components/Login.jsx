import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import bgImage from "../assets/login_img.jpeg";
import { auth } from "../firebase"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { API_ENDPOINTS } from "../config";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("isInsurer", data.isInsurer);
        localStorage.setItem("isPatient", data.isPatient);
        if (data.isInsurer) {
          alert('Insurer logged in successfully');
          window.location.href = '/Main';
        } else {
          alert('Patient logged in successfully');
          window.location.href = '/Main';
        }
      } else {
        setError('Failed to Login, Please try again');
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(googleUserData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("isInsurer", data.isInsurer);
        localStorage.setItem("isPatient", data.isPatient);
        const roleType = data.isInsurer ? "Insurer" : "Patient";
        const action = data.message && data.message.includes("Login") ? "logged in" : "registered";
        alert(`Successfully ${action} with Google as ${roleType}`);
        window.location.href = '/Main';
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Minimal Navbar */}
      <nav className="w-full bg-[#23283b] border-b border-[#23283b] py-3 px-6 flex items-center justify-between">
        <Link to="/">
          <span className="font-serif italic font-bold text-white text-xl tracking-tight cursor-pointer">
            <span className="text-blue-400">AARO</span>GAYA
          </span>
        </Link>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">Register</button>
        </Link>
      </nav>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
        <div className="flex-1 flex items-center justify-center mb-12">
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-center mb-6 text-gray-900">Sign in to your account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow"
          >
            Login
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
          If you do not have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">Register here</a>
        </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}