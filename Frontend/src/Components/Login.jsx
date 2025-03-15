import { useState } from "react";
import React from "react";
import bgImage from "../assets/login_img.jpeg";
// import { auth } from "../firebase"; 
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
 
 
      const data = await response.json();
      console.log(data);
      if(response.ok){
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("isInsurer", data.isInsurer);
        localStorage.setItem("isPatient", data.isPatient);
 
 
        if(data.isInsurer){
          alert('Insurer logged in successfully');
          window.location.href = '/Main';
        }else{
          alert('Patient logged in successfully');
          window.location.href = '/Main';
        }
      }else{
        alert('Failed to Login, Please try again');
      }
      console.log("Login successfull ", data)
    }catch(err){
      console.log(err.message);
    }
    console.log("Login Submitted", formData);
  };
 
 

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
      
  //     Get user information from Google account
  //     const user = result.user;
      
  //     Send Google user info to backend to verify/login
  //     const googleUserData = {
  //       email: user.email,
  //       googleUid: user.uid
  //     };
      
  //     const response = await fetch('http://localhost:4001/api/google-login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(googleUserData),
  //     });

  //     const data = await response.json();
      
  //     if (response.ok) {
  //       alert('Successfully logged in with Google');
  //       window.location.href = '/Main';
  //     } else {
  //       // Handle case where Google user doesn't exist in your database
  //       if (data.message === "User not found") {
  //         alert("No account found with this Google email. Please register first.");
  //         window.location.href = '/register';
  //       } else {
  //         setError(data.message || "Login failed");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Google Sign-In error:", err);
  //     setError(err.message);
  //   }
  // };

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
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Error message display */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Continue with Google Button */}
        {/* <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center space-x-2 shadow-md mt-4 border"
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button> */}
        
        <p className="text-center text-gray-700 mt-4">
          If you do not have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}