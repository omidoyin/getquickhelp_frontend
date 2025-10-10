'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiSearch, FiShield, FiBookOpen, FiMessageSquare, FiStar, FiAlertTriangle, FiUserCheck } from 'react-icons/fi';
import Link from 'next/link';

type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
};

export default function HelpPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // FAQ items based on the help and how to document
  const faqItems: FaqItem[] = [
    {
      id: 'safety',
      question: 'Safety First',
      answer: (
        <div className="space-y-4">
          <p>
            Your safety is our top priority. Always use the QuickHelp platform to book and communicate with service providers. 
            This ensures you're protected by our safety measures and support systems.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Important Safety Tips:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Always communicate and pay through the QuickHelp platform</li>
              <li>Verify provider ratings and reviews before booking</li>
              <li>Never share personal contact information before booking</li>
              <li>Report any suspicious activity immediately</li>
            </ul>
          </div>
          <p className="text-sm text-foreground/70">
            Note: Users with repeated off-platform booking complaints will have their visibility reduced.
          </p>
        </div>
      ),
      icon: <FiShield className="text-primary" size={20} />
    },
    {
      id: 'search',
      question: 'How to Search for Services',
      answer: (
        <div className="space-y-4">
          <p>Finding the right service provider is easy with QuickHelp:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open the QuickHelp app</li>
            <li>Use the search bar to enter the service you need (e.g., "plumber", "electrician")</li>
            <li>Browse through the list of available providers</li>
            <li>Filter results by rating, distance, or price</li>
            <li>View provider profiles to see their ratings and reviews</li>
          </ol>
          <p className="text-sm text-foreground/70">
            Tip: Save your favorite providers for quick access in the future.
          </p>
        </div>
      ),
      icon: <FiSearch className="text-primary" size={20} />
    },
    {
      id: 'booking',
      question: 'How to Book a Service',
      answer: (
        <div className="space-y-4">
          <p>Booking a service is simple and secure:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Find a service provider that meets your needs</li>
            <li>Select your preferred date and time</li>
            <li>Provide details about the job</li>
            <li>Review the total cost and any additional fees</li>
            <li>Confirm your booking</li>
          </ol>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">After Booking:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You'll receive a confirmation with the provider's details</li>
              <li>Chat with your provider to discuss any specific requirements</li>
              <li>Get real-time updates about your booking status</li>
            </ul>
          </div>
        </div>
      ),
      icon: <FiBookOpen className="text-primary" size={20} />
    },
    {
      id: 'rating',
      question: 'How to Rate a Service',
      answer: (
        <div className="space-y-4">
          <p>Your feedback helps maintain our community's quality. Here's how to rate a service:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>After your service is completed, you'll receive a rating prompt</li>
            <li>Rate your experience from 1 to 5 stars</li>
            <li>Write a brief review about your experience (optional but helpful)</li>
            <li>Submit your rating</li>
          </ol>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Rating Guidelines:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Be honest and fair in your assessment</li>
              <li>Consider punctuality, quality of work, and professionalism</li>
              <li>Provide constructive feedback when possible</li>
              <li>Contact support if there are any issues that need resolution</li>
            </ul>
          </div>
        </div>
      ),
      icon: <FiStar className="text-primary" size={20} />
    },
    {
      id: 'reporting',
      question: 'How to Report an Issue',
      answer: (
        <div className="space-y-4">
          <p>If you encounter any issues, please report them immediately:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go to the booking in your 'Past Bookings'</li>
            <li>Select 'Report an Issue'</li>
            <li>Choose the type of issue from the list</li>
            <li>Provide details about what happened</li>
            <li>Submit your report</li>
          </ol>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">When to Report:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>If a provider requests payment outside the platform</li>
              <li>For any safety concerns or inappropriate behavior</li>
              <li>If the service wasn't as described</li>
              <li>For any violations of our community guidelines</li>
            </ul>
          </div>
          <p className="text-sm text-foreground/70">
            Note: All reports are taken seriously and will be investigated promptly.
          </p>
        </div>
      ),
      icon: <FiAlertTriangle className="text-primary" size={20} />
    },
    {
      id: 'chat',
      question: 'How to Use the Chat',
      answer: (
        <div className="space-y-4">
          <p>The in-app chat helps you communicate safely with service providers:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>After booking, go to the 'Chats' tab</li>
            <li>Select your booking to open the chat</li>
            <li>Send messages, photos, or documents related to your service</li>
            <li>Get real-time updates about your booking</li>
          </ol>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Chat Features:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Share photos of the job that needs to be done</li>
              <li>Send your location for accurate service</li>
              <li>View service provider details and ratings</li>
              <li>Access chat history for future reference</li>
            </ul>
          </div>
          <p className="text-sm text-foreground/70">
            Remember: Always keep communication within the app for your safety and records.
          </p>
        </div>
      ),
      icon: <FiMessageSquare className="text-primary" size={20} />
    },
    {
      id: 'verification',
      question: 'How to Get Verified',
      answer: (
        <div className="space-y-4">
          <p>Become a verified user to increase your trust score and access more features:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go to your Profile</li>
            <li>Select 'Get Verified'</li>
            <li>Follow the on-screen instructions to submit your ID and other required documents</li>
            <li>Complete the verification process (usually takes 1-2 business days)</li>
          </ol>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Benefits of Being Verified:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Higher trust score on the platform</li>
              <li>Priority customer support</li>
              <li>Access to premium features</li>
              <li>Increased visibility for service providers</li>
            </ul>
          </div>
          <p className="text-sm text-foreground/70">
            Your information is securely stored and only used for verification purposes.
          </p>
        </div>
      ),
      icon: <FiUserCheck className="text-primary" size={20} />
    }
  ];

  // Filter FAQ items based on search query
  const filteredItems = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof item.answer === 'string' && 
         item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : faqItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Help & How-To</h1>
          <p className="text-sm text-foreground/70">Find answers to common questions</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-foreground/40" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between focus:outline-none"
                  aria-expanded={activeItem === item.id}
                  aria-controls={`faq-${item.id}`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium text-foreground">{item.question}</span>
                  </div>
                  {activeItem === item.id ? (
                    <FiChevronDown className="text-foreground/60" />
                  ) : (
                    <FiChevronRight className="text-foreground/60" />
                  )}
                </button>
                {activeItem === item.id && (
                  <div 
                    id={`faq-${item.id}`}
                    className="px-4 pb-4 pt-0 text-foreground/80 text-sm border-t border-gray-100"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-foreground/70">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-foreground mb-3">Still need help?</h2>
          <p className="text-foreground/70 mb-4">
            Our support team is here to help you with any questions or issues you might have.
          </p>
          <div className="space-y-3">
            <a
              href="mailto:support@quickhelp.com"
              className="block w-full bg-primary text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Contact Support
            </a>
            <Link
              href="/faq"
              className="block w-full text-center py-3 px-4 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              View Full FAQ
            </Link>
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4 md:hidden">
        <Link href="/" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/chat" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">💬</span>
          <span className="text-xs mt-1">Chats</span>
        </Link>
        <Link href="/help" className="flex flex-col items-center text-primary">
          <span className="text-2xl">❓</span>
          <span className="text-xs mt-1">Help</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
