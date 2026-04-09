import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../config';




const SubmitClaims= () => {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   claimAmount: '',
   claimDescription: '',
   files: []
 });




 const [errors, setErrors] = useState({});




 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({
     ...formData,
     [name]: value
   });
 
   // Clear error when user starts typing
   if (errors[name]) {
     setErrors({
       ...errors,
       [name]: ''
     });
   }
 };




 const handleFileChange = (e) => {
   setFormData({
     ...formData,
     files: e.target.files
   });
 };




 const validateForm = () => {
   const newErrors = {};
 
   if (!formData.name.trim()) newErrors.name = 'Name is required';
 
   if (!formData.email.trim()) {
     newErrors.email = 'Email is required';
   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
     newErrors.email = 'Email is invalid';
   }
 
   if (!formData.claimAmount.trim()) {
     newErrors.claimAmount = 'Claim amount is required';
   } else if (isNaN(formData.claimAmount)) {
     newErrors.claimAmount = 'Claim amount must be a number';
   }
 
   if (!formData.claimDescription.trim()) {
     newErrors.claimDescription = 'Claim description is required';
   }
 
   return newErrors;
 };




 const handleSubmit = async (e) => {
   e.preventDefault();
    console.log("🚀 Debug: formData before FormData append", formData);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
     setErrors(formErrors);
     return;
   }
    const formDataToSend = new FormData();
   formDataToSend.append("name", formData.name);
   formDataToSend.append("email", formData.email);
   formDataToSend.append("amount", formData.claimAmount);
   formDataToSend.append("description", formData.claimDescription);
    if (formData.files.length > 0) {
     for (let i = 0; i < formData.files.length; i++) {
       formDataToSend.append("files", formData.files[i]); // Correct way to append files
     }
   }
    console.log("✅ FormData Debug:");
   for (let pair of formDataToSend.entries()) {
     console.log(pair[0], pair[1]);
   }
    try {
     const response = await fetch(API_ENDPOINTS.claims, {
       method: "POST",
       body: formDataToSend,
     });
      const data = await response.json();
     console.log("data from claim ", data);
      if (response.ok) {
       alert("Form submitted successfully!");
     } else {
       alert("Error submitting form: " + data.message);
     }
   } catch (error) {
     console.error("Error submitting form:", error);
     alert("An error occurred while submitting the form.");
   }
 };
 



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 border border-blue-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 rounded-full p-3 mb-3 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h6m-6 0V7a4 4 0 00-8 0v6a4 4 0 004 4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">Submit a Claim</h2>
          <p className="text-gray-500 text-center max-w-md">Please fill out the form below to submit your insurance claim. All fields marked with <span className='text-red-500'>*</span> are required.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${errors.name ? 'border-red-400' : 'border-blue-100'}`}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${errors.email ? 'border-red-400' : 'border-blue-100'}`}
              placeholder="Enter your email address"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="claimAmount">
                Claim Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="claimAmount"
                name="claimAmount"
                type="text"
                value={formData.claimAmount}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${errors.claimAmount ? 'border-red-400' : 'border-blue-100'}`}
                placeholder="Enter claim amount"
              />
              {errors.claimAmount && <p className="text-red-500 text-xs mt-1 font-medium">{errors.claimAmount}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="claimDescription">
                Claim Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="claimDescription"
                name="claimDescription"
                value={formData.claimDescription}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${errors.claimDescription ? 'border-red-400' : 'border-blue-100'}`}
                placeholder="Provide details about your claim"
                rows="3"
              />
              {errors.claimDescription && <p className="text-red-500 text-xs mt-1 font-medium">{errors.claimDescription}</p>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="documents">
              Supporting Documents
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-6">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="documents" className="block cursor-pointer text-blue-700 font-medium hover:underline">
                  <span>Upload files</span>
                  <input
                    id="documents"
                    name="documents"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB each</p>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 text-lg tracking-wide"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default SubmitClaims;







