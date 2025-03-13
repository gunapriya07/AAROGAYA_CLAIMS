import React, { useState } from 'react';


// Sample claims data
const initialClaims = [
 {
   id: 1,
   fullName: "John Doe",
   email: "johndoe@example.com",
   claimAmount: 1250.00,
   claimDescription: "Emergency room visit due to severe allergic reaction",
   supportingDocuments: ["medical_report.pdf", "receipts.pdf", "insurance_form.pdf"],
   dateSubmitted: "2025-02-15",
   status: "pending"
 },
 {
   id: 2,
   fullName: "Jane Smith",
   email: "janesmith@example.com",
   claimAmount: 875.50,
   claimDescription: "Specialist consultation and prescribed medication",
   supportingDocuments: ["prescription.pdf", "receipt.pdf"],
   dateSubmitted: "2025-02-10",
   status: "approved"
 },
 {
   id: 3,
   fullName: "Robert Johnson",
   email: "robert@example.com",
   claimAmount: 3200.00,
   claimDescription: "Surgery and one night hospital stay",
   supportingDocuments: ["hospital_bill.pdf", "doctor_report.pdf", "insurance_form.pdf"],
   dateSubmitted: "2025-01-28",
   status: "rejected"
 },
 {
   id: 4,
   fullName: "Sarah Williams",
   email: "sarah@example.com",
   claimAmount: 450.00,
   claimDescription: "Physical therapy sessions (5)",
   supportingDocuments: ["therapy_receipts.pdf"],
   dateSubmitted: "2025-02-20",
   status: "pending"
 }
];


const Dashboard = () => {
 const [claims, setClaims] = useState(initialClaims);
 const [selectedClaim, setSelectedClaim] = useState(null);
 const [showDetailModal, setShowDetailModal] = useState(false);
 const [statusFilter, setStatusFilter] = useState("all");
  // Filter claims based on status
 const filteredClaims = statusFilter === "all"
   ? claims
   : claims.filter(claim => claim.status === statusFilter);
  // Open the detail modal
 const handleViewDetails = (claim) => {
   setSelectedClaim(claim);
   setShowDetailModal(true);
 };
  // Close the detail modal
 const handleCloseModal = () => {
   setShowDetailModal(false);
 };
  // Status badge component
 const StatusBadge = ({ status }) => {
   let badgeClass = "px-3 py-1 text-xs font-bold rounded-full";
  
   switch(status) {
     case "pending":
       badgeClass += " bg-yellow-100 text-yellow-800";
       break;
     case "approved":
       badgeClass += " bg-green-100 text-green-800";
       break;
     case "rejected":
       badgeClass += " bg-red-100 text-red-800";
       break;
     default:
       badgeClass += " bg-gray-100 text-gray-800";
   }
  
   return (
     <span className={badgeClass}>
       {status.charAt(0).toUpperCase() + status.slice(1)}
     </span>
   );
 };
  // Modal for claim details
 const ClaimDetailModal = ({ claim, onClose }) => {
   if (!claim) return null;
  
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
         <div className="p-6 border-b border-gray-200">
           <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-gray-800">Claim Details</h2>
             <button
               onClick={onClose}
               className="text-gray-500 hover:text-gray-700 focus:outline-none"
             >
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
         </div>
        
         <div className="p-6">
           <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="text-xl font-semibold">{claim.fullName}</h3>
               <p className="text-gray-600">{claim.email}</p>
             </div>
             <div className="flex flex-col items-end">
               <StatusBadge status={claim.status} />
               <p className="mt-2 text-gray-600">Submitted: {claim.dateSubmitted}</p>
             </div>
           </div>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="border rounded-lg p-4">
               <h4 className="font-semibold text-gray-700 mb-2">Claim Amount</h4>
               <p className="text-2xl font-bold">${claim.claimAmount.toFixed(2)}</p>
             </div>
            
             <div className="border rounded-lg p-4">
               <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
               <div className="flex items-center">
                 <div className={`w-3 h-3 rounded-full mr-2 ${
                   claim.status === 'approved' ? 'bg-green-500' :
                   claim.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                 }`}></div>
                 <p className="capitalize">{claim.status}</p>
               </div>
             </div>
           </div>
          
           <div className="border rounded-lg p-4 mb-6">
             <h4 className="font-semibold text-gray-700 mb-2">Claim Description</h4>
             <p>{claim.claimDescription}</p>
           </div>
          
           <div className="border rounded-lg p-4">
             <h4 className="font-semibold text-gray-700 mb-2">Supporting Documents</h4>
             <ul className="space-y-2">
               {claim.supportingDocuments.map((doc, index) => (
                 <li key={index} className="flex items-center">
                   <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                   <span>{doc}</span>
                 </li>
               ))}
             </ul>
           </div>
          
           {claim.status === "pending" && (
             <div className="flex justify-end mt-6 space-x-2">
               <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                 Approve Claim
               </button>
               <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                 Reject Claim
               </button>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };
  return (
   <div className="container mx-auto px-4 py-8">
     <h1 className="text-3xl font-bold mb-8">Patient Claims Dashboard</h1>
    
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
             onClick={() => setStatusFilter("pending")}
             className={`px-4 py-2 rounded-md ${statusFilter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
           >
             Pending
           </button>
           <button
             onClick={() => setStatusFilter("approved")}
             className={`px-4 py-2 rounded-md ${statusFilter === "approved" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
           >
             Approved
           </button>
           <button
             onClick={() => setStatusFilter("rejected")}
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
             <tr key={claim.id} className="hover:bg-gray-50">
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="flex items-center">
                   <div>
                     <div className="text-sm font-medium text-gray-900">
                       {claim.fullName}
                     </div>
                     <div className="text-sm text-gray-500">
                       {claim.email}
                     </div>
                   </div>
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">${claim.claimAmount.toFixed(2)}</div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{claim.dateSubmitted}</div>
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
