'use client';

import { useState } from 'react';
import { 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiDollarSign, 
  FiShield, 
  FiUser, 
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export default function RulesPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'community-guidelines': true,
    'user-responsibilities': false,
    'provider-requirements': false,
    'payment-terms': false,
    'safety-policies': false,
    'dispute-resolution': false,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections: Section[] = [
    {
      id: 'community-guidelines',
      title: 'Community Guidelines',
      icon: <FiUser className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/90">
            We're committed to maintaining a respectful and safe community for all users. Please follow these guidelines:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Be respectful and professional in all communications</li>
            <li>Provide accurate information in your profile and service listings</li>
            <li>Respect others' time and privacy</li>
            <li>Do not engage in harassment, discrimination, or hate speech</li>
            <li>Keep all communications and transactions on the platform</li>
          </ul>
          <p className="text-foreground/70 text-sm">
            Violations of these guidelines may result in account suspension or termination.
          </p>
        </div>
      )
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <FiUser className="text-green-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/90">
            As a user of our platform, you agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate and complete information when creating an account</li>
            <li>Pay for services as agreed upon with the service provider</li>
            <li>Communicate clearly about your needs and expectations</li>
            <li>Respect the service provider's time and property</li>
            <li>Report any issues or concerns through the proper channels</li>
          </ul>
        </div>
      )
    },
    {
      id: 'provider-requirements',
      title: 'Service Provider Requirements',
      icon: <FiCheckCircle className="text-purple-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/90">
            Service providers on our platform must meet the following requirements:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide proof of necessary qualifications and certifications</li>
            <li>Maintain accurate and up-to-date service listings</li>
            <li>Respond to service requests in a timely manner</li>
            <li>Deliver services as described in your listings</li>
            <li>Maintain appropriate insurance coverage</li>
            <li>Adhere to all applicable laws and regulations</li>
          </ul>
        </div>
      )
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: <FiDollarSign className="text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/90">
            Our payment terms are designed to be fair and transparent for all parties:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All payments must be processed through the platform</li>
            <li>Service providers set their own rates and payment terms</li>
            <li>Platform fees will be clearly displayed before booking</li>
            <li>Refund policies vary by service provider</li>
            <li>Disputes must be reported within 7 days of service completion</li>
          </ul>
        </div>
      )
    },
    {
      id: 'safety-policies',
      title: 'Safety Policies',
      icon: <FiShield className="text-red-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Important Safety Information</h4>
            <p className="text-sm text-red-700">
              Your safety is our top priority. Always communicate and pay through the platform, and report any suspicious activity immediately.
            </p>
          </div>
          
          <h5 className="font-medium text-foreground mt-4">User Safety Tips:</h5>
          <ul className="list-disc pl-5 space-y-2">
            <li>Verify service provider ratings and reviews before booking</li>
            <li>Meet in public places when possible</li>
            <li>Let someone know when and where you'll be meeting a service provider</li>
            <li>Trust your instincts - if something feels wrong, cancel the booking</li>
          </ul>
          
          <h5 className="font-medium text-foreground mt-4">Provider Safety Tips:</h5>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keep personal contact information private</li>
            <li>Meet in safe, public locations when possible</li>
            <li>Use the platform's messaging system for all communications</li>
            <li>Report any suspicious or inappropriate behavior</li>
          </ul>
        </div>
      )
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: <FiMessageSquare className="text-orange-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/90">
            We aim to resolve all disputes fairly and efficiently. Here's our process:
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Step 1: Direct Communication</h5>
            <p className="text-sm text-blue-700">
              Try to resolve the issue directly with the other party through our messaging system.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h5 className="font-medium text-blue-800 mb-2">Step 2: Report the Issue</h5>
            <p className="text-sm text-blue-700">
              If you can't resolve the issue directly, report it through our support system within 7 days of the service.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h5 className="font-medium text-blue-800 mb-2">Step 3: Our Review</h5>
            <p className="text-sm text-blue-700">
              Our support team will review the case and may request additional information from both parties.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h5 className="font-medium text-blue-800 mb-2">Step 4: Resolution</h5>
            <p className="text-sm text-blue-700">
              We'll work to find a fair resolution, which may include refunds, credits, or other appropriate actions.
            </p>
          </div>
          
          <p className="text-sm text-foreground/70 mt-4">
            Note: Our decisions are final and binding. By using our platform, you agree to this dispute resolution process.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">Community Rules & Guidelines</h1>
          <p className="text-foreground/70">
            These rules help ensure a safe and positive experience for everyone on our platform.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                  expandedSections[section.id] ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
                aria-expanded={expandedSections[section.id]}
              >
                <div className="flex items-center">
                  <span className="mr-3">{section.icon}</span>
                  <span className="font-medium text-foreground">{section.title}</span>
                </div>
                {expandedSections[section.id] ? (
                  <FiChevronUp className="text-foreground/50" />
                ) : (
                  <FiChevronDown className="text-foreground/50" />
                )}
              </button>
              
              {expandedSections[section.id] && (
                <div className="p-6 pt-2 border-t border-gray-100">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-xl">
          <div className="flex items-start">
            <FiAlertTriangle className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Need help or have questions?</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  If you have any questions about these rules or need assistance, please contact our support team.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="/help"
                  className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-600"
                >
                  Contact Support
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
