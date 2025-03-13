import { useState, useEffect } from "react";
import React from "react";

export default function SubmitClaim() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    description: "",
    files: [],
  });

  const [error, setError] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [filePreviewUrls, setFilePreviewUrls] = useState([]);
  const [formStep, setFormStep] = useState(1);
  const totalSteps = 3;

  // Load saved draft from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("claimDraft");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        // We can't restore file objects from localStorage, only their names
      } catch (e) {
        console.error("Failed to parse saved draft");
      }
    }
  }, []);

  // Auto-save draft with visual indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("claimDraft", JSON.stringify(formData));
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 1000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [formData]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Name is required";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Valid email is required";
      case "amount":
        return value > 0 ? "" : "Amount must be greater than 0";
      case "description":
        return value.length >= 10 ? "" : "Description must be at least 10 characters";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    setError({
      ...error,
      [name]: validateField(name, value)
    });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    
    // Create preview URLs for the files
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setFilePreviewUrls([...filePreviewUrls, ...newUrls]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, files: updatedFiles });
    
    const updatedUrls = [...filePreviewUrls];
    URL.revokeObjectURL(updatedUrls[index]); // Clean up the URL
    updatedUrls.splice(index, 1);
    setFilePreviewUrls(updatedUrls);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newFiles = Array.from(e.dataTransfer.files);
    setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setFilePreviewUrls([...filePreviewUrls, ...newUrls]);
  };

  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear the form? All unsaved data will be lost.")) {
      setFormData({
        name: "",
        email: "",
        amount: "",
        description: "",
        files: [],
      });
      setFilePreviewUrls([]);
      localStorage.removeItem("claimDraft");
    }
  };

  const nextStep = () => {
    let hasErrors = false;
    
    if (formStep === 1) {
      const nameError = validateField("name", formData.name);
      const emailError = validateField("email", formData.email);
      
      setError({
        ...error,
        name: nameError,
        email: emailError
      });
      
      hasErrors = nameError || emailError;
    } else if (formStep === 2) {
      const amountError = validateField("amount", formData.amount);
      const descriptionError = validateField("description", formData.description);
      
      setError({
        ...error,
        amount: amountError,
        description: descriptionError
      });
      
      hasErrors = amountError || descriptionError;
    }
    
    if (!hasErrors) {
      setFormStep(current => Math.min(current + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setFormStep(current => Math.max(current - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      amount: validateField("amount", formData.amount),
      description: validateField("description", formData.description)
    };
    
    if (Object.values(errors).some(error => error)) {
      setError(errors);
      return;
    }
    
    console.log("Claim Submitted:", formData);
    localStorage.removeItem("claimDraft"); // Clear saved draft after submission
    
    // Display success message
    alert("Claim submitted successfully!");
    clearForm();
    setFormStep(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">Submit a Claim</h2>
        <p className="text-center text-gray-500 mb-6">Please fill out the form below to submit your claim</p>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep > i ? "bg-blue-500 text-white" : 
                  formStep === i + 1 ? "bg-blue-100 border-2 border-blue-500 text-blue-500" : 
                  "bg-gray-200 text-gray-500"
                } font-bold`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((formStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Personal Info</span>
            <span>Claim Details</span>
            <span>Supporting Documents</span>
          </div>
        </div>
        
        {/* Autosave Indicator */}
        <div className="flex justify-end mb-4">
          <span className={`text-sm ${isSaving ? "text-green-500" : "text-gray-400"}`}>
            {isSaving ? "Saving draft..." : "Draft saved"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {formStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
                    error.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                  aria-invalid={error.name ? "true" : "false"}
                  aria-describedby={error.name ? "name-error" : undefined}
                />
                {error.name && (
                  <p id="name-error" className="mt-1 text-red-500 text-sm">{error.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
                    error.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                  aria-invalid={error.email ? "true" : "false"}
                  aria-describedby={error.email ? "email-error" : undefined}
                />
                {error.email && (
                  <p id="email-error" className="mt-1 text-red-500 text-sm">{error.email}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Claim Details */}
          {formStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Claim Details</h3>
              
              {/* Claim Amount */}
              <div>
                <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Claim Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    id="amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
                      error.amount ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    aria-invalid={error.amount ? "true" : "false"}
                    aria-describedby={error.amount ? "amount-error" : undefined}
                  />
                </div>
                {error.amount && (
                  <p id="amount-error" className="mt-1 text-red-500 text-sm">{error.amount}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Claim Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all min-h-32 ${
                    error.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Please provide a detailed description of your claim..."
                  aria-invalid={error.description ? "true" : "false"}
                  aria-describedby={error.description ? "description-error" : undefined}
                />
                {error.description && (
                  <p id="description-error" className="mt-1 text-red-500 text-sm">{error.description}</p>
                )}
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${formData.description.length < 10 ? "text-red-500" : "text-gray-500"}`}>
                    {formData.description.length}/300 characters
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Supporting Documents */}
          {formStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Supporting Documents</h3>
              
              {/* File Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Upload Supporting Documents</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1">Drag and drop files here, or click to select files</p>
                    <p className="text-sm text-gray-400 mt-1">Supported formats: PDF, JPG, PNG, DOCX (Max: 10MB per file)</p>
                  </div>
                </div>
              </div>
              
              {/* File Preview */}
              {formData.files.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Selected Files ({formData.files.length})</h4>
                  <ul className="space-y-2">
                    {formData.files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Remove ${file.name}`}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div>
              {formStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Clear Form
              </button>
              
              {formStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Submit Claim
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}