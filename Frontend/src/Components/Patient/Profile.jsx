import { useState, useEffect } from "react";
import React from "react";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    profileImage: null,
    claimsHistory: [],
    accountCreated: new Date().toISOString().split('T')[0] // Today's date
  });
  
  const [isEditing, setIsEditing] = useState(true); // Start in editing mode
  const [editedData, setEditedData] = useState({...profileData});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload this to a server
      setEditedData({
        ...editedData,
        profileImage: URL.createObjectURL(file)
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({...profileData});
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setProfileData({...editedData});
      setIsEditing(false);
      setIsSaving(false);
    }, 800);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({...profileData});
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate age based on date of birth
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Profile</h1>
        
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white relative">
            <div className="flex items-center">
              <div className="mr-4">
                {/* Profile Image */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                  {isEditing ? (
                    <label className="cursor-pointer w-full h-full flex items-center justify-center">
                      {editedData.profileImage ? (
                        <img 
                          src={editedData.profileImage} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 text-xs text-center p-2">
                          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Upload
                        </div>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleProfileImageChange} 
                      />
                    </label>
                  ) : profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt={profileData.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="bg-white text-gray-800 px-2 py-1 rounded w-full max-w-xs"
                      placeholder="Your Name"
                    />
                  ) : (
                    profileData.name || "New User"
                  )}
                </h2>
                <p className="text-blue-100">
                  Member since {formatDate(profileData.accountCreated)}
                </p>
              </div>
              
              {!isEditing && (
                <button 
                  onClick={handleEdit} 
                  className="absolute top-6 right-6 bg-white text-blue-600 px-4 py-2 rounded-md shadow-sm hover:bg-blue-50 transition-all duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        placeholder="your.email@example.com"
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.email || "Not provided"}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.phone || "Not provided"}</p>
                    )}
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editedData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        rows="3"
                        placeholder="Your street address, city, state, pincode"
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.address || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Additional Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h3>
                
                <div className="space-y-4">
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editedData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                      />
                    ) : (
                      <p className="text-gray-800">
                        {profileData.dateOfBirth ? 
                          `${formatDate(profileData.dateOfBirth)} (${calculateAge(profileData.dateOfBirth)} years old)` : 
                          "Not provided"}
                      </p>
                    )}
                  </div>
                  
                  {/* Occupation */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="occupation"
                        value={editedData.occupation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        placeholder="Your occupation"
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.occupation || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Edit Mode Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6">
                {!profileData.name && !profileData.email ? (
                  // Just show Save button for new users
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                ) : (
                  // Show Cancel and Save for existing users
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Claims History */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Claims History</h3>
            
            {profileData.claimsHistory && profileData.claimsHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Claim ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profileData.claimsHistory.map((claim) => (
                      <tr key={claim.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {claim.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(claim.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ${claim.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${claim.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              claim.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                              claim.status === 'Denied' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <button className="text-blue-600 hover:text-blue-800 hover:underline">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2">No claims history found.</p>
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Submit Your First Claim
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}