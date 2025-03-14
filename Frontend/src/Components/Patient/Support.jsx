import React, { useState } from 'react';

const Support = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});

  // Sample FAQ data
  const faqCategories = [
    {
      id: 'account',
      title: 'Account & Billing',
      faqs: [
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of our homepage. Fill in your details, verify your email address, and you\'re all set!'
        },
        {
          id: 'forgot-password',
          question: 'I forgot my password. How can I reset it?',
          answer: 'Click on the "Forgot Password" link on the login page. Enter the email address associated with your account, and we\'ll send you instructions to reset your password.'
        },
        {
          id: 'change-plan',
          question: 'How do I upgrade or downgrade my subscription plan?',
          answer: 'Log in to your account, go to "Account Settings" > "Subscription", and select "Change Plan". From there, you can choose the plan that best fits your needs.'
        }
      ]
    },
    {
      id: 'product',
      title: 'Product Features',
      faqs: [
        {
          id: 'features',
          question: 'What are the main features of your product?',
          answer: 'Our product includes cloud storage, team collaboration tools, automated workflows, detailed analytics, and integration with over 50 third-party applications.'
        },
        {
          id: 'mobile',
          question: 'Is there a mobile app available?',
          answer: 'Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.'
        },
        {
          id: 'data-export',
          question: 'Can I export my data?',
          answer: 'Absolutely. You can export your data in various formats including CSV, PDF, and JSON. Go to "Settings" > "Data Management" > "Export Data" to get started.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      faqs: [
        {
          id: 'browser',
          question: 'Which browsers are supported?',
          answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for optimal performance.'
        },
        {
          id: 'errors',
          question: 'I\'m experiencing technical issues. What should I do?',
          answer: 'First, try clearing your browser cache and cookies. If the issue persists, please contact our support team with details about the error and screenshots if possible.'
        },
        {
          id: 'api',
          question: 'Do you offer API documentation?',
          answer: 'Yes, comprehensive API documentation is available for developers. Visit our Developer Portal to access the documentation, code samples, and API keys.'
        }
      ]
    }
  ];

  // Toggle FAQ item expansion
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle contact form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    // alert("Thank you for your message! Our support team will contact you soon.");
    console.log(contactForm);

    try{
      const response = await fetch('http://localhost:4001/questionapi/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactForm)
      })

      const data = await response.json();
      if(response.ok){
        alert('Question poster successfully')
      }else{
        alert('Failed to post question')
      }
      console.log('Question posted ', data);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }catch(err){
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Support & FAQ</h1>
          <p className="mt-2">Find answers to frequently asked questions or contact our support team</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick help links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">Send us an email at support@example.com for personalized assistance.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600">Chat with our support agents in real-time during business hours.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-gray-600">Browse our extensive documentation and tutorials.</p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          {faqCategories.map(category => (
            <div key={category.id} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.title}</h3>
              <div className="space-y-4">
                {category.faqs.map(faq => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full px-6 py-4 text-left"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="ml-6">
                        {expandedItems[faq.id] ? (
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>
                    {expandedItems[faq.id] && (
                      <div className="px-6 py-4 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Still Need Help?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contactForm.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Request
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
              <p className="text-gray-300">Monday - Friday: 9am - 6pm EST</p>
              <p className="text-gray-300">Weekend: 10am - 4pm EST</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;