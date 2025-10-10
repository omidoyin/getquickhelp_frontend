'use client';

import { useState, useEffect } from 'react';
import { 
  FiEdit, 
  FiClock, 
  FiStar, 
  FiHeart, 
  FiShare2, 
  FiSettings, 
  FiHelpCircle, 
  FiBookOpen, 
  FiMapPin, 
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiYoutube,
  FiInstagram,
  FiGlobe,
  FiVideo,
  FiImage,
  FiDollarSign,
  FiCalendar,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi';

type UserType = 'user' | 'provider';
type VerificationStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

interface UserData {
  name: string;
  email: string;
  location: string;
  joinDate: string;
  rating: number;
  reviews: number;
  isProvider: boolean;
  services: string[];
  availability: string;
  maxJobsPerDay: number;
  maxJobsPerWeek: number;
  helpPoints: number;
  referrals: number;
  verificationStatus: VerificationStatus;
  businessHours?: {
    open: string;
    close: string;
    days: string[];
  };
  socialLinks?: {
    website?: string;
    instagram?: string;
    tiktok?: string;
  };
  gallery?: {
    images: string[];
    video?: string;
  };
}

export default function ProfilePage() {
  const [userType, setUserType] = useState<UserType>('user');
  const [trustScore, setTrustScore] = useState(50);
  const [isVerified, setIsVerified] = useState(false);
  const [isTrustScoreAnimating, setIsTrustScoreAnimating] = useState(false);
  
  // Mock data
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    location: 'Lagos, Nigeria',
    joinDate: 'Joined January 2023',
    rating: 4.8,
    reviews: 42,
    isProvider: false,
    services: [],
    availability: '',
    maxJobsPerDay: 0,
    maxJobsPerWeek: 0,
    helpPoints: 120,
    referrals: 5,
    verificationStatus: 'not_started',
    businessHours: {
      open: '09:00',
      close: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    socialLinks: {
      website: 'mybusiness.com',
      instagram: '@mybusiness',
      tiktok: '@mybusiness'
    },
    gallery: {
      images: ['/placeholder-image.jpg', '/placeholder-image.jpg', '/placeholder-image.jpg'],
      video: '/placeholder-video.mp4'
    }
  });

  // Animate trust score on load or when it changes
  useEffect(() => {
    setIsTrustScoreAnimating(true);
    const timer = setTimeout(() => {
      setIsTrustScoreAnimating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [trustScore]);

  // Update user type and trust score when switching between user and provider
  useEffect(() => {
    if (userType === 'provider') {
      setUserData(prev => ({
        ...prev,
        isProvider: true,
        services: ['Plumbing', 'Electrical'],
        availability: 'Available Today',
        maxJobsPerDay: 5,
        maxJobsPerWeek: 20
      }));
      setTrustScore(100); // Providers start with 100%
    } else {
      setUserData(prev => ({
        ...prev,
        isProvider: false,
        services: [],
        availability: '',
        maxJobsPerDay: 0,
        maxJobsPerWeek: 0
      }));
      setTrustScore(50); // Users start with 50%
    }
  }, [userType]);

  const handleVerification = () => {
    setUserData(prev => ({
      ...prev,
      verificationStatus: 'pending' as VerificationStatus
    }));
    // In a real app, this would trigger the KYC verification flow
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        verificationStatus: 'verified' as VerificationStatus
      }));
      setTrustScore(100);
      setIsVerified(true);
    }, 2000);
  };

  // Render verification status badge
  const renderVerificationBadge = () => {
    switch(userData.verificationStatus) {
      case 'verified':
        return (
          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
            <FiCheckCircle className="mr-1" size={12} /> Verified
          </span>
        );
      case 'pending':
        return (
          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
            <FiClock className="mr-1" size={12} /> Under Review
          </span>
        );
      case 'rejected':
        return (
          <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center">
            <FiAlertCircle className="mr-1" size={12} /> Verification Needed
          </span>
        );
      default:
        return null;
    }
  };

  // Render trust level icon based on score
  const renderTrustLevelIcon = (score: number) => {
    if (score >= 90) return '💎';
    if (score >= 75) return '🌟';
    if (score >= 50) return '✨';
    return '🔹';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Profile</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-foreground/70 hover:text-primary">
              <FiSettings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {userData.helpPoints}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                  {userData.name.charAt(0)}
                </div>
                {isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <FiCheckCircle size={14} />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <div className="flex items-center flex-wrap">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  {renderVerificationBadge()}
                </div>
                <p className="text-sm text-foreground/80">{userData.email}</p>
                <p className="text-sm text-foreground/80 flex items-center mt-1">
                  <FiMapPin className="mr-1 flex-shrink-0" size={12} /> 
                  <span className="truncate max-w-[180px]">{userData.location}</span>
                </p>
                <div className="flex items-center mt-1">
                  <div className="text-yellow-400 flex items-center">
                    <FiStar className="fill-current" size={14} />
                    <span className="text-foreground/80 text-sm ml-1">{userData.rating.toFixed(1)}</span>
                    <span className="text-foreground/50 text-xs ml-1">({userData.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-primary hover:bg-gray-100 p-2 rounded-full">
              <FiEdit size={18} />
            </button>
          </div>

          {/* Trust Score with Animation */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="relative">
                  <FiHeart className="text-red-500" size={24} />
                  {isTrustScoreAnimating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-400 opacity-75"></div>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-foreground/90">Trust Level</p>
                  <p className="text-xs text-foreground/60">
                    {trustScore >= 90 
                      ? 'Elite Trusted' 
                      : trustScore >= 75 
                        ? 'Highly Trusted' 
                        : trustScore >= 50 
                          ? 'Trusted' 
                          : 'New Member'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold flex items-center justify-end">
                  <span className={`${isTrustScoreAnimating ? 'animate-bounce' : ''}`}>
                    {renderTrustLevelIcon(trustScore)}
                  </span>
                  <span className="ml-1">{trustScore}%</span>
                </div>
                <p className="text-xs text-foreground/60">
                  {userType === 'provider' ? 'Provider Score' : 'User Score'}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
              <div 
                className={`bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 h-2.5 rounded-full transition-all duration-1000`} 
                style={{ 
                  width: `${trustScore}%`,
                  backgroundSize: '200% 100%',
                  animation: isTrustScoreAnimating ? 'gradient 2s ease infinite' : 'none'
                }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-foreground/60">
              {userType === 'provider' 
                ? trustScore >= 90 
                  ? '🌟 Top-rated provider! Keep up the great work!' 
                  : trustScore >= 75 
                    ? 'Great job! You\'re a trusted provider.' 
                    : 'Complete your profile to increase visibility.'
                : trustScore >= 90 
                  ? '🌟 You\'re a valued member of our community!' 
                  : 'Complete verification to unlock more features.'}
            </p>
          </div>

          {/* Verification CTA */}
          {!isVerified && (
            <button 
              className="w-full mt-4 bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              onClick={handleVerification}
            >
              <FiUserCheck className="mr-2" size={18} />
              {userData.verificationStatus === 'pending' 
                ? 'Verification in Progress...' 
                : 'Verify Your Account'}
            </button>
          )}

          {/* Help Points & Referrals */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FiStar className="text-primary" size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground/80">Help Points</p>
                  <p className="text-lg font-bold">{userData.helpPoints}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-100">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FiUsers className="text-green-600" size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground/80">Referrals</p>
                  <p className="text-lg font-bold">{userData.referrals}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Specific Info */}
        {userData.isProvider && (
          <>
            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Service Details</h3>
                <button className="text-primary text-sm font-medium">Edit</button>
              </div>
              
              <div className="space-y-5">
                {/* Services */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">Services Offered</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.services.map((service, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center"
                      >
                        {service}
                        <button className="ml-1 text-blue-400 hover:text-blue-600">
                          ×
                        </button>
                      </span>
                    ))}
                    <button className="text-primary text-sm font-medium flex items-center border border-dashed border-primary/40 rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors">
                      <FiPlus size={14} className="mr-1" /> Add
                    </button>
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">
                    Can't find your service? <button className="text-primary">Suggest a category</button>
                  </p>
                </div>
                
                {/* Business Hours */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">Business Hours</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Monday - Friday</span>
                      <span className="text-sm font-medium">
                        {userData.businessHours?.open} - {userData.businessHours?.close}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekends</span>
                      <span className="text-sm text-foreground/60">Closed</span>
                    </div>
                  </div>
                </div>
                
                {/* Job Limits */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground/70 mb-1">Max Jobs Per Day</p>
                    <div className="flex items-center bg-gray-50 rounded-lg p-3">
                      <span className="text-foreground/90 font-medium">{userData.maxJobsPerDay}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/70 mb-1">Max Jobs Per Week</p>
                    <div className="flex items-center bg-gray-50 rounded-lg p-3">
                      <span className="text-foreground/90 font-medium">{userData.maxJobsPerWeek}</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">Social Links</p>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <FiGlobe className="text-foreground/60 mr-2" size={16} />
                      <span className="text-sm">{userData.socialLinks?.website || 'Add website'}</span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <FiInstagram className="text-foreground/60 mr-2" size={16} />
                      <span className="text-sm">{userData.socialLinks?.instagram || 'Add Instagram'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Gallery</h3>
                <button className="text-primary text-sm font-medium">Manage</button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {userData.gallery?.images.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {img.includes('placeholder') ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiImage size={24} />
                      </div>
                    ) : (
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
                
                {userData.gallery?.video && (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiVideo size={24} className="text-gray-400" />
                    </div>
                  </div>
                )}
                
                <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-foreground/50 hover:border-primary hover:text-primary transition-colors">
                  <FiPlus size={20} />
                  <span className="text-xs mt-1">Add Media</span>
                </button>
              </div>
              
              <p className="text-xs text-foreground/50 mt-2">
                Upload up to 4 images and 1 video to showcase your work
              </p>
            </div>
            
            {/* Subscription */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 mb-6 border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Get More Visibility</h3>
                  <p className="text-sm text-foreground/70">Upgrade your plan to reach more customers</p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full">
                  Free Trial
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium">Basic Plan</p>
                    <p className="text-sm text-foreground/60">Free for 3 months</p>
                  </div>
                  <span className="text-sm font-medium">₦0</span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border-2 border-primary">
                  <div>
                    <p className="font-medium">Premium Plan</p>
                    <p className="text-sm text-foreground/60">Billed monthly</p>
                  </div>
                  <span className="text-sm font-medium">₦2,000<span className="text-foreground/60">/mo</span></span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium">Business Plan</p>
                    <p className="text-sm text-foreground/60">Save 33% with 3-month plan</p>
                  </div>
                  <span className="text-sm font-medium">₦4,000<span className="text-foreground/60">/3mo</span></span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                <FiDollarSign className="mr-2" size={16} />
                Upgrade Now
              </button>
              
              <p className="text-xs text-center text-foreground/50 mt-3">
                Your free trial ends in 89 days
              </p>
            </div>
          </>
        )}

        {/* Stats & Achievements */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Performance</h3>
            <button className="text-primary text-sm font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-100">
              <div className="flex items-center justify-center">
                <FiStar className="text-yellow-400 fill-current mr-1" size={18} />
                <span className="font-bold text-lg">{userData.rating}</span>
              </div>
              <p className="text-xs text-foreground/60 mt-1">Average Rating</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-100">
              <div className="font-bold text-lg">{userData.reviews}</div>
              <p className="text-xs text-foreground/60 mt-1">Total Reviews</p>
            </div>
            
            {userData.isProvider && (
              <>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-100">
                  <div className="font-bold text-lg">98%</div>
                  <p className="text-xs text-foreground/60 mt-1">Response Rate</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl text-center border border-amber-100">
                  <div className="font-bold text-lg">15 min</div>
                  <p className="text-xs text-foreground/60 mt-1">Avg. Response Time</p>
                </div>
              </>
            )}
          </div>
          
          {/* Achievements/Badges */}
          <div>
            <h4 className="text-sm font-medium text-foreground/80 mb-2">Achievements</h4>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
              {["On-Time Star", "5-Star Streak", "Quick Responder"].map((badge, index) => (
                <div key={index} className="flex-shrink-0 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-xs font-medium">{badge}</span>
                </div>
              ))}
              <button className="flex-shrink-0 text-primary text-xs font-medium flex items-center">
                View all <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
          
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <FiBookOpen className="text-primary" size={18} />
              </div>
              <span className="font-medium">My Reviews</span>
            </div>
            <span className="text-foreground/40">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                <FiHelpCircle className="text-green-500" size={18} />
              </div>
              <span className="font-medium">Help & How To</span>
            </div>
            <span className="text-foreground/40">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                <FiShare2 className="text-purple-500" size={18} />
              </div>
              <div>
                <p className="font-medium text-left">Share Profile</p>
                <p className="text-xs text-foreground/60 text-left">Earn 50 help points per referral</p>
              </div>
            </div>
            <span className="text-foreground/40">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mr-3">
                <FiAlertCircle className="text-amber-500" size={18} />
              </div>
              <span className="font-medium">Community Guidelines</span>
            </div>
            <span className="text-foreground/40">→</span>
          </button>

          {/* Toggle between User and Provider */}
          <div className="pt-4">
            {!userData.isProvider ? (
              <button 
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-xl font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                onClick={() => setUserType('provider')}
              >
                <FiUserCheck className="mr-2" size={18} />
                Become a Provider
              </button>
            ) : (
              <button 
                className="w-full bg-gray-100 text-foreground py-3.5 rounded-xl font-medium flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={() => setUserType('user')}
              >
                Switch to User Profile
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Consistent with other pages */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4">
        <a href="/" className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="/chat" className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
          <span className="text-2xl">💬</span>
          <span className="text-xs mt-1">Chats</span>
        </a>
        <a href="/help" className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
          <span className="text-2xl">❓</span>
          <span className="text-xs mt-1">Help</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-primary">
          <div className="relative">
            <span className="text-2xl">👤</span>
            {!isVerified && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
          <span className="text-xs mt-1">Profile</span>
        </a>
      </nav>
      
      {/* Add keyframe animation for gradient */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
