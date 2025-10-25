'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiCalendar, FiClock, FiPhone, FiMapPin, FiCheck, FiStar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Mock provider data
const mockProvider = {
  id: 1,
  name: 'John D.',
  rating: 4.9,
  service: 'Plumbing',
  distance: '0.5 km away',
  rate: '$25/hr',
  experience: '5 years',
  completedJobs: 247,
  about: 'Professional plumber with 5 years of experience in residential and commercial plumbing. Specialized in pipe repairs, installations, and maintenance.',
  availability: [
    { day: 'Mon', date: '16', available: true },
    { day: 'Tue', date: '17', available: true },
    { day: 'Wed', date: '18', available: true },
    { day: 'Thu', date: '19', available: false },
    { day: 'Fri', date: '20', available: true },
    { day: 'Sat', date: '21', available: false },
    { day: 'Sun', date: '22', available: false },
  ],
  timeSlots: [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ],
  reviews: [
    { id: 1, author: 'Michael S.', rating: 5, comment: 'Great service! Fixed my leaking pipe in no time.', date: '2 days ago' },
    { id: 2, author: 'Sarah L.', rating: 5, comment: 'Professional and on time. Would definitely recommend!', date: '1 week ago' },
    { id: 3, author: 'David K.', rating: 4, comment: 'Good work, but was 15 minutes late.', date: '2 weeks ago' },
  ]
};

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const providerName = searchParams.get('name') || 'Provider';
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [serviceNeeded, setServiceNeeded] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you would fetch the provider data based on the ID
  const [provider, setProvider] = useState(mockProvider);
  
  // Calculate average rating
  const averageRating = provider.reviews.reduce((acc, review) => acc + review.rating, 0) / provider.reviews.length;

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Appointment booked successfully!');
      router.push('/bookings/confirmation');
    }, 1500);
  };

  const availableDates = provider.availability.filter(date => date.available);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-foreground/80 hover:text-foreground"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Book Service</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-24">
        {/* Provider Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 -mt-2">
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mr-4">
              {provider.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{provider.name}</h2>
              <p className="text-foreground/80">{provider.service} • {provider.distance}</p>
              <div className="flex items-center mt-1">
                <FiStar className="text-yellow-400 mr-1" fill="currentColor" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="mx-1 text-foreground/50">•</span>
                <span className="text-foreground/60">{provider.completedJobs}+ jobs</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-primary">{provider.rate}</p>
              <p className="text-xs text-foreground/60">per hour</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'details' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Booking Details
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'about' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'reviews' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Reviews ({provider.reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Service Needed */}
              <div>
                <h3 className="font-medium mb-2">What service do you need?</h3>
                <input
                  type="text"
                  placeholder="E.g., Fix leaking pipe, install faucet, etc."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                />
              </div>

              {/* Select Date */}
              <div>
                <h3 className="font-medium mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {provider.availability.map((date) => (
                    <button
                      key={date.date}
                      onClick={() => setSelectedDate(parseInt(date.date))}
                      disabled={!date.available}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                        selectedDate === parseInt(date.date)
                          ? 'bg-primary text-white'
                          : date.available
                          ? 'bg-white border border-gray-200 hover:border-primary'
                          : 'bg-gray-100 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-xs">{date.day}</span>
                      <span className="font-medium">{date.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time */}
              {selectedDate && (
                <div>
                  <h3 className="font-medium mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {provider.timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border ${
                          selectedTime === time
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="font-medium">About {provider.name}</h3>
              <p className="text-foreground/80">{provider.about}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-2" fill="currentColor" />
                  <span>{averageRating.toFixed(1)} ({provider.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>{provider.completedJobs}+ jobs completed</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="text-primary mr-2" />
                  <span>{provider.distance} from your location</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Reviews</h3>
                <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span>{provider.reviews.length} reviews</span>
                </div>
              </div>

              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} mr-0.5`} 
                              fill={i < review.rating ? 'currentColor' : 'none'}
                              size={14}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-foreground/50">{review.date}</span>
                    </div>
                    <p className="mt-2 text-foreground/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-foreground/60">Total</p>
              <p className="text-xl font-bold">{provider.rate}</p>
            </div>
            <button
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime || isLoading}
              className={`px-6 py-3 rounded-lg font-medium ${
                selectedDate && selectedTime && !isLoading
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
