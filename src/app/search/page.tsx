'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiArrowLeft, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Mock data for search results
const mockSearchResults = [
  { id: 1, type: 'service', name: 'Plumbing Services', category: 'Plumbing', rating: 4.8 },
  { id: 2, type: 'provider', name: 'John D.', category: 'Plumbing', rating: 4.9, distance: '0.5 km' },
  { id: 3, type: 'service', name: 'House Cleaning', category: 'Cleaning', rating: 4.7 },
  { id: 4, type: 'provider', name: 'Sarah M.', category: 'Cleaning', rating: 4.8, distance: '1.2 km' },
  { id: 5, type: 'service', name: 'Electrical Repairs', category: 'Electrical', rating: 4.6 },
  { id: 6, type: 'provider', name: 'Mike T.', category: 'Electrical', rating: 4.7, distance: '0.8 km' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter results based on search query and active filter
  const filteredResults = mockSearchResults.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'services' && item.type === 'service') ||
                         (activeFilter === 'providers' && item.type === 'provider');
    
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleResultClick = (result: any) => {
    if (result.type === 'provider') {
      router.push(`/book/${result.id}?name=${encodeURIComponent(result.name)}`);
    } else {
      router.push(`/providers?category=${encodeURIComponent(result.category.toLowerCase())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-3 text-foreground/80 hover:text-foreground"
            >
              <FiArrowLeft size={20} />
            </button>
            
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for services or providers..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-primary"
              >
                <FiSearch size={18} />
              </button>
            </form>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="ml-3 p-2 text-foreground/80 hover:text-foreground"
            >
              <FiFilter size={20} />
            </button>
          </div>
          
          {/* Search Filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'services', label: 'Services' },
                  { id: 'providers', label: 'Providers' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1.5 text-sm rounded-full ${
                      activeFilter === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-foreground/80 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {query ? (
          <>
            <h1 className="text-lg font-semibold mb-4">
              Search results for "<span className="text-primary">{query}</span>"
            </h1>
            
            {filteredResults.length > 0 ? (
              <div className="space-y-3">
                {filteredResults.map((result) => (
                  <div 
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-primary/30 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground">{result.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-foreground/60">
                            {result.type === 'provider' ? 'Provider' : 'Service'} • {result.category}
                            {result.distance && ` • ${result.distance} away`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm ml-1">{result.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiSearch size={24} className="text-foreground/40" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
                <p className="text-foreground/60">Try different keywords or remove search filters</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
              <FiSearch size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">What are you looking for?</h3>
            <p className="text-foreground/60">Search for services or providers to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
