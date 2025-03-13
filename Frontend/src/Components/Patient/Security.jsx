import React from 'react';


const Security = () => {
 return (
   <div className="container mx-auto px-4 py-8 max-w-4xl">
     <h1 className="text-3xl font-bold mb-6">Security & Privacy</h1>
    
     {/* Security Section */}
     <section className="mb-10">
       <h2 className="text-2xl font-semibold mb-4">Security Measures</h2>
       <div className="space-y-4">
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Data Encryption</h3>
           <p>All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL encryption. Your data at rest is encrypted with AES-256 encryption.</p>
         </div>
        
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Access Controls</h3>
           <p>We implement strict access controls and authentication mechanisms to ensure only authorized personnel can access your data. We follow the principle of least privilege in our access management systems.</p>
         </div>
        
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Regular Security Audits</h3>
           <p>Our systems undergo regular security audits and penetration testing by independent security researchers to identify and address potential vulnerabilities.</p>
         </div>
       </div>
     </section>
    
     {/* Privacy Section */}
     <section className="mb-10">
       <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
       <div className="prose max-w-none">
         <p className="mb-4">We are committed to protecting your privacy and ensuring transparency about how we handle your data. Below is a summary of our privacy practices:</p>
        
         <h3 className="text-xl font-medium my-3">Information We Collect</h3>
         <ul className="list-disc pl-6 mb-4">
           <li className="mb-2">Account information: When you create an account, we collect your name, email address, and other information you provide.</li>
           <li className="mb-2">Usage data: We collect information about how you interact with our services, including features you use and time spent on the platform.</li>
           <li className="mb-2">Device information: We collect information about the device and browser you use to access our services.</li>
         </ul>
        
         <h3 className="text-xl font-medium my-3">How We Use Your Information</h3>
         <ul className="list-disc pl-6 mb-4">
           <li className="mb-2">To provide and improve our services</li>
           <li className="mb-2">To personalize your experience</li>
           <li className="mb-2">To communicate with you about service updates and offers</li>
           <li className="mb-2">To ensure the security of your account</li>
         </ul>
        
         <h3 className="text-xl font-medium my-3">Data Sharing</h3>
         <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
         <ul className="list-disc pl-6 mb-4">
           <li className="mb-2">Service providers who help us operate our business</li>
           <li className="mb-2">Legal authorities when required by law</li>
           <li className="mb-2">Business partners with your explicit consent</li>
         </ul>
       </div>
     </section>
    
     {/* Data Rights Section */}
     <section className="mb-10">
       <h2 className="text-2xl font-semibold mb-4">Your Data Rights</h2>
       <p className="mb-4">Depending on your location, you may have certain rights regarding your personal data:</p>
      
       <div className="grid md:grid-cols-2 gap-4">
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Access & Portability</h3>
           <p>You have the right to access the personal data we hold about you and to request a copy of your data in a structured, commonly used format.</p>
         </div>
        
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Correction</h3>
           <p>You can request corrections to inaccurate or incomplete personal data we hold about you.</p>
         </div>
        
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Deletion</h3>
           <p>You can request deletion of your personal data when it's no longer necessary for the purposes for which it was collected.</p>
         </div>
        
         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <h3 className="text-xl font-medium mb-2">Objection</h3>
           <p>You have the right to object to the processing of your personal data in certain circumstances.</p>
         </div>
       </div>
     </section>
    
     {/* Contact Section */}
     <section className="mb-6">
       <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
       <p className="mb-4">If you have any questions or concerns about our security practices or privacy policy, please contact our privacy team:</p>
       <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
         <p className="mb-1"><strong>Email:</strong> privacy@example.com</p>
         <p className="mb-1"><strong>Address:</strong> 123 Privacy Street, Security City, 12345</p>
         <p><strong>Phone:</strong> (555) 123-4567</p>
       </div>
     </section>
    
     <footer className="text-sm text-gray-500 mt-8">
       <p>Last updated: March 2025</p>
     </footer>
   </div>
 );
};


export default Security;

