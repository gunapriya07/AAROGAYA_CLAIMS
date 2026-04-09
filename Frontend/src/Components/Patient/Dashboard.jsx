import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config';



const Dashboard = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  const isInsurer = localStorage.getItem('isInsurer') === 'true';
  console.log("isInsurer ", isInsurer);

  useEffect(() => {
    // Fetch user name and email from localStorage
    const storedName = localStorage.getItem("name") || localStorage.getItem("username") || "User";
    setUserName(storedName);
    const storedEmail = localStorage.getItem("email") || "";

    const fetchClaims = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.claims);
        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }
        let data = await response.json();
        // If not insurer, filter claims to only those raised by the logged-in user
        if (!isInsurer) {
          data = data.filter(claim => {
            // Match by email (preferred) or by name fallback
            return (claim.email && storedEmail && claim.email === storedEmail) ||
                   (claim.name && storedName && claim.name === storedName);
          });
        }
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
     const response = await fetch(`${API_ENDPOINTS.claims}/${claimId}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between mb-8 border border-blue-100">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-1">Welcome back, <span className="text-blue-600">{userName}</span></h1>
            <p className="text-gray-500 text-lg">{isInsurer ? 'Insurer' : 'Patient'} Claims Dashboard</p>
          </div>
          <div className="flex gap-8 mt-6 md:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{claims.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Claims</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{claims.filter(c => c.status === 'Approved').length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{claims.filter(c => c.status === 'Pending').length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{claims.filter(c => c.status === 'Rejected').length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex gap-2">
            {['all', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2 rounded-full font-semibold shadow-sm transition-all text-sm
                  ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search claims..."
              className="px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* Claims Table Card */}
        <div className="bg-white/90 rounded-2xl shadow-lg border border-blue-100 overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Submission Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {filteredClaims.map((claim, idx) => (
                <tr key={claim._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{claim.name}</div>
                        <div className="text-xs text-gray-500">{claim.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-900 font-medium">${claim.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-700">{claim.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetails(claim)}
                      className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating New Claim Button (for patients) */}
        {!isInsurer && (
          <div className="fixed bottom-8 right-8 z-50">
            <a href="/SubmitClaim">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl font-bold text-lg flex items-center gap-2">
                + New Claim
              </button>
            </a>
          </div>
        )}

        {/* Modal */}
        {showDetailModal && selectedClaim && (
          <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};


export default Dashboard;

