import React from 'react';


const Security = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-2 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10 border border-blue-100">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600 rounded-full p-4 mb-4 shadow-lg">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7a4 4 0 10-8 0v6a4 4 0 004 4h6" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">Security & Privacy</h1>
          <p className="text-gray-600 text-center max-w-2xl">Your trust is our top priority. We are committed to safeguarding your data with robust security measures and transparent privacy practices.</p>
        </div>

        {/* Security Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <span>
              <svg className="inline h-7 w-7 text-blue-500 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </span>
            Security Measures
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-2">
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><span>🔒</span> Data Encryption</h3>
              <p>All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL encryption. Your data at rest is encrypted with AES-256 encryption.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-2">
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><span>🛡️</span> Access Controls</h3>
              <p>Strict access controls and authentication mechanisms ensure only authorized personnel can access your data. We follow the principle of least privilege in our access management systems.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-2">
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><span>🔍</span> Regular Security Audits</h3>
              <p>Our systems undergo regular security audits and penetration testing by independent security researchers to identify and address potential vulnerabilities.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-2">
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><span>📱</span> Multi-Factor Authentication</h3>
              <p>We offer multi-factor authentication (MFA) to add an extra layer of security to your account, protecting you from unauthorized access.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-2 md:col-span-2">
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><span>🚨</span> Incident Response</h3>
              <p>We have a dedicated incident response team and protocols in place to quickly address and mitigate any security threats or breaches.</p>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <span>
              <svg className="inline h-7 w-7 text-blue-500 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4-4v8" /></svg>
            </span>
            Privacy Policy
          </h2>
          <div className="prose max-w-none">
            <p className="mb-4">We are committed to protecting your privacy and ensuring transparency about how we handle your data. Below is a summary of our privacy practices:</p>
            <h3 className="text-xl font-medium my-3">Information We Collect</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Account information: When you create an account, we collect your name, email address, and other information you provide.</li>
              <li className="mb-2">Usage data: We collect information about how you interact with our services, including features you use and time spent on the platform.</li>
              <li className="mb-2">Device information: We collect information about the device and browser you use to access our services.</li>
              <li className="mb-2">Cookies & Tracking: We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can manage your cookie preferences at any time.</li>
            </ul>
            <h3 className="text-xl font-medium my-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">To provide and improve our services</li>
              <li className="mb-2">To personalize your experience</li>
              <li className="mb-2">To communicate with you about service updates and offers</li>
              <li className="mb-2">To ensure the security of your account</li>
              <li className="mb-2">To comply with legal obligations</li>
            </ul>
            <h3 className="text-xl font-medium my-3">Data Sharing</h3>
            <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Service providers who help us operate our business</li>
              <li className="mb-2">Legal authorities when required by law</li>
              <li className="mb-2">Business partners with your explicit consent</li>
            </ul>
            <h3 className="text-xl font-medium my-3">Data Retention</h3>
            <p className="mb-4">We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law. You can request deletion of your data at any time.</p>
            <h3 className="text-xl font-medium my-3">User Responsibilities</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Keep your password confidential and do not share it with others.</li>
              <li className="mb-2">Notify us immediately if you suspect unauthorized access to your account.</li>
              <li className="mb-2">Review your privacy settings regularly.</li>
            </ul>
          </div>
        </section>

        {/* Data Rights Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <span>
              <svg className="inline h-7 w-7 text-blue-500 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4-4v8" /></svg>
            </span>
            Your Data Rights
          </h2>
          <p className="mb-4">Depending on your location, you may have certain rights regarding your personal data:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2"><span>📄</span> Access & Portability</h3>
              <p>You have the right to access the personal data we hold about you and to request a copy of your data in a structured, commonly used format.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2"><span>✏️</span> Correction</h3>
              <p>You can request corrections to inaccurate or incomplete personal data we hold about you.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2"><span>🗑️</span> Deletion</h3>
              <p>You can request deletion of your personal data when it's no longer necessary for the purposes for which it was collected.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2"><span>🚫</span> Objection</h3>
              <p>You have the right to object to the processing of your personal data in certain circumstances.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <span>
              <svg className="inline h-7 w-7 text-blue-500 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5a8.38 8.38 0 01-1.9.8c-.5.2-1 .3-1.5.3a8.5 8.5 0 01-8.5-8.5c0-.5.1-1 .3-1.5.2-.5.5-1 .8-1.9" /></svg>
            </span>
            Contact Us
          </h2>
          <p className="mb-4">If you have any questions or concerns about our security practices or privacy policy, please contact our privacy team:</p>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <p className="mb-1"><strong>Email:</strong> privacy@example.com</p>
            <p className="mb-1"><strong>Address:</strong> 123 Privacy Street, Security City, 12345</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
          </div>
        </section>

        <footer className="text-sm text-gray-500 mt-8 text-center">
          <p>Last updated: March 2025</p>
        </footer>
      </div>
    </div>
  );
};


export default Security;

