import React, { useEffect, useState } from 'react';


const Dashboard = () => {
 const [claims, setClaims] = useState([]);
 const [selectedClaim, setSelectedClaim] = useState(null);
 const [showDetailModal, setShowDetailModal] = useState(false);
 const [statusFilter, setStatusFilter] = useState("all");
 const [errorMessage, setErrorMessage] = useState("");


 const isInsurer = localStorage.getItem('isInsurer') === 'true';
 console.log("isInsurer ", isInsurer);


 useEffect(() => {
   const fetchClaims = async () => {
     try {
       const response = await fetch('http://localhost:4001/claimapi/claims');
       if (!response.ok) {
         throw new Error("Failed to fetch claims");
       }
       const data = await response.json();
       setClaims(data);
     } catch (err) {
       console.error(err.message);
     }
   };
   fetchClaims();
 }, []);


 const filteredClaims = statusFilter === "all"
   ? claims
   : claims.filter(claim => claim.status === statusFilter);


 const handleViewDetails = (claim) => {
   setSelectedClaim(claim);
   setShowDetailModal(true);
   setErrorMessage("");
 };


 const handleCloseModal = () => {
   setShowDetailModal(false);
   setErrorMessage("");
 };


 const handleStatusChange = async (claimId, newStatus) => {
   if (isInsurer == false) {
     setErrorMessage("Patient cannot update the claim status");
     alert("Patient cannot update the claim status");
     return;
   }
   try {
     const response = await fetch(`http://localhost:4001/claimapi/claims/${claimId}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ status: newStatus }),
     });
     if (response.ok) {
       alert("Status updated successfully");
       const updatedClaim = await response.json();
       setClaims(prevClaims =>
         prevClaims.map(claim =>
           claim._id === claimId ? { ...claim, status: updatedClaim.status } : claim
         )
       );
       window.location.reload();
     } else {
       alert("Failed to update status");
     }
   } catch (error) {
     console.error("Error updating claim:", error);
   }
 };


 const StatusBadge = ({ status }) => {
   if (!status) return <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
   let badgeClass = "px-3 py-1 text-xs font-bold rounded-full";
   switch (status) {
     case "Pending": badgeClass += " bg-yellow-100 text-yellow-800"; break;
     case "Approved": badgeClass += " bg-green-100 text-green-800"; break;
     case "Rejected": badgeClass += " bg-red-100 text-red-800"; break;
     default: badgeClass += " bg-gray-100 text-gray-800";
   }
   return <span className={badgeClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
 };


 const ClaimDetailModal = ({ claim, onClose }) => {
   if (!claim) return null;
   return (
     <div>
       {errorMessage && (
       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
         {errorMessage}
       </div>
     )}
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
           <h2 className="text-2xl font-bold text-gray-800">Claim Details</h2>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
         </div>
         <div className="p-6">
           <div className="mb-6 flex justify-between items-start">
             <div>
               <h3 className="text-xl font-semibold">{claim.name}</h3>
               <p className="text-gray-600">{claim.email}</p>
             </div>
             <div className="flex flex-col items-end">
               <StatusBadge status={claim.status} />
               <p className="mt-2 text-gray-600">Submitted: {claim.createdAt}</p>
             </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="border rounded-lg p-4">
               <h4 className="font-semibold text-gray-700 mb-2">Claim Amount</h4>
               <p className="text-2xl font-bold">${claim.amount}</p>
             </div>
           </div>
           <div className="border rounded-lg p-4 mb-6">
             <h4 className="font-semibold text-gray-700 mb-2">Claim Description</h4>
             <p>{claim.description}</p>
           </div>
           {claim.status === "Pending" && (
             <div className="mt-6">
               {errorMessage && (
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                   {errorMessage}
                 </div>
               )}
               <div className="flex justify-end space-x-2">
                 <button
                   onClick={() => handleStatusChange(claim._id, "Approved")}
                   className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${!isInsurer && 'opacity-50 cursor-not-allowed'}`}
                   disabled={!isInsurer}
                 >
                   Approve Claim
                 </button>
                 <button
                   onClick={() => handleStatusChange(claim._id, "Rejected")}
                   className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${!isInsurer && 'opacity-50 cursor-not-allowed'}`}
                   disabled={!isInsurer}
                 >
                   Reject Claim
                 </button>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
     </div>
   );
 };
  return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">Patient Claims Dashboard</h1>
   
    <div className="mb-4">
      <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
        {isInsurer ? "Insurer View" : "Patient View"}
      </div>
    </div>
  
    {/* Filters */}
    <div className="flex flex-wrap items-center justify-between mb-6">
      <div className="mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-2">Claims Status</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-md ${statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("Pending")}
            className={`px-4 py-2 rounded-md ${statusFilter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("Approved")}
            className={`px-4 py-2 rounded-md ${statusFilter === "approved" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter("Rejected")}
            className={`px-4 py-2 rounded-md ${statusFilter === "rejected" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Rejected
          </button>
        </div>
      </div>
    
      <div>
        <input
          type="text"
          placeholder="Search claims..."
          className="px-4 py-2 border rounded-md w-full md:w-auto"
        />
      </div>
    </div>
  
    {/* Claims Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submission Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredClaims.map((claim) => (
            <tr key={claim._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {claim.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {claim.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${claim.amount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{claim.createdAt}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={claim.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleViewDetails(claim)}
                  className="text-blue-600 hover:text-blue-900 font-medium"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {showDetailModal && selectedClaim && (
      <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
    )}
  </div>
);
};


export default Dashboard;

