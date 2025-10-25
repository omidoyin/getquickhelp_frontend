'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiFilter, FiMapPin, FiPhone, FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Mock data for providers
const allProviders = [
  { id: 1, name: 'John D.', rating: 4.9, service: 'Plumbing', distance: '0.5 km', rate: '$25/hr', available: true, experience: '5 years' },
  { id: 2, name: 'Sarah M.', rating: 4.8, service: 'Cleaning', distance: '1.2 km', rate: '$20/hr', available: true, experience: '3 years' },
  { id: 3, name: 'Mike T.', rating: 4.7, service: 'Electrical', distance: '0.8 km', rate: '$30/hr', available: false, experience: '7 years' },
  { id: 4, name: 'Alex K.', rating: 4.9, service: 'Plumbing', distance: '1.5 km', rate: '$28/hr', available: true, experience: '4 years' },
  { id: 5, name: 'Emma W.', rating: 4.6, service: 'Cleaning', distance: '2.1 km', rate: '$22/hr', available: true, experience: '2 years' },
  { id: 6, name: 'David L.', rating: 4.8, service: 'Electrical', distance: '1.8 km', rate: '$35/hr', available: true, experience: '6 years' },
];

export default function ProvidersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [providers, setProviders] = useState(allProviders);
  const [filters, setFilters] = useState({
    rating: 0,
    distance: 10,
    priceRange: [0, 100],
    availableNow: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter providers based on category and filters
    let filtered = [...allProviders];
    
    if (category) {
      filtered = filtered.filter(provider => 
        provider.service.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (filters.rating > 0) {
      filtered = filtered.filter(provider => provider.rating >= filters.rating);
    }
    
    if (filters.availableNow) {
      filtered = filtered.filter(provider => provider.available);
    }
    
    setProviders(filtered);
  }, [category, filters]);

  const handleBookNow = (providerId: number, providerName: string) => {
    router.push(`/book/${providerId}?name=${encodeURIComponent(providerName)}`);
  };

  const handleContact = (providerName: string) => {
    toast.success(`Contacting ${providerName}...`);
    // In a real app, this would open a chat or call functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-foreground/80 hover:text-foreground"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">
            {category ? `${category} Services` : 'All Providers'}
          </h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="ml-auto flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            <FiFilter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <h3 className="font-medium mb-4">Filter Providers</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Minimum Rating: {filters.rating || 'Any'}
                </label>
                <div className="flex items-center space-x-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, rating})}
                      className={`px-3 py-1 text-sm rounded-md ${
                        filters.rating === rating 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Max Distance: {filters.distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.distance}
                  onChange={(e) => setFilters({...filters, distance: Number(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availableNow"
                  checked={filters.availableNow}
                  onChange={(e) => setFilters({...filters, availableNow: e.target.checked})}
                  className="h-4 w-4 text-primary rounded"
                />
                <label htmlFor="availableNow" className="ml-2 text-sm text-foreground/80">
                  Available Now
                </label>
              </div>

              <button 
                onClick={() => setFilters({
                  rating: 0,
                  distance: 10,
                  priceRange: [0, 100],
                  availableNow: false,
                })}
                className="text-sm text-primary hover:underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Providers List */}
        <div className="space-y-4">
          {providers.length > 0 ? (
            providers.map((provider) => (
              <div key={provider.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mr-4">
                    {provider.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground">{provider.name}</h3>
                        <p className="text-sm text-foreground/80">{provider.service} • {provider.distance} away</p>
                        <div className="flex items-center mt-1">
                          <FiStar className="text-yellow-400 mr-1" fill="currentColor" />
                          <span className="text-sm">{provider.rating}</span>
                          <span className="mx-2 text-foreground/50">•</span>
                          <span className="text-sm text-foreground/80">{provider.experience} exp</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-sm font-medium">{provider.rate}</span>
                          {!provider.available && (
                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleBookNow(provider.id, provider.name)}
                        disabled={!provider.available}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                          provider.available
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {provider.available ? 'Book Now' : 'Not Available'}
                      </button>
                      <button
                        onClick={() => handleContact(provider.name)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                      >
                        <FiPhone className="text-foreground/80" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">No providers found matching your criteria.</p>
              <button
                onClick={() => setFilters({
                  rating: 0,
                  distance: 10,
                  priceRange: [0, 100],
                  availableNow: false,
                })}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
