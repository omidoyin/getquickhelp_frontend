"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMapPin, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Mock data for categories
const categories = [
  { id: 1, name: 'Plumbing', icon: '🔧' },
  { id: 2, name: 'Electrical', icon: '💡' },
  { id: 3, name: 'Cleaning', icon: '🧹' },
  { id: 4, name: 'Carpentry', icon: '🔨' },
  { id: 5, name: 'Painting', icon: '🎨' },
  { id: 6, name: 'Gardening', icon: '🌿' },
  { id: 7, name: 'Moving', icon: '🚚' },
  { id: 8, name: 'More', icon: '➕' },
];

// Mock data for top providers
const topProviders = [
  { id: 1, name: 'John D.', rating: 4.9, service: 'Plumbing', distance: '0.5 km' },
  { id: 2, name: 'Sarah M.', rating: 4.8, service: 'Cleaning', distance: '1.2 km' },
  { id: 3, name: 'Mike T.', rating: 4.7, service: 'Electrical', distance: '0.8 km' },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [location, setLocation] = useState('Nearby');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results with query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error('Please enter a search term');
    }
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryId);
    // Navigate to category page or filter providers
    router.push(`/providers?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  const handleSeeAllProviders = () => {
    router.push('/providers');
  };

  const handleBookNow = (providerId: number, providerName: string) => {
    // Navigate to booking page with provider details
    router.push(`/book/${providerId}?name=${encodeURIComponent(providerName)}`);
  };

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
    // You can add location-based filtering logic here
    toast.success(`Location set to ${newLocation}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-2 text-foreground/90"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-primary">QuickHelp</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/notifications" 
              className="p-2 text-foreground/80 hover:text-foreground relative"
            >
              <FiBell size={20} />
              {/* Unread indicator */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="px-3 py-2 text-foreground hover:bg-gray-100 rounded">Home</a>
              <a href="#" className="px-3 py-2 text-foreground hover:bg-gray-100 rounded">My Bookings</a>
              <a href="#" className="px-3 py-2 text-foreground hover:bg-gray-100 rounded">Messages</a>
              <a href="#" className="px-3 py-2 text-foreground hover:bg-gray-100 rounded">Profile</a>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Location and Search */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FiMapPin className="text-primary mr-2" />
            <select 
              className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              value={location}
              onChange={(e) => handleLocationSelect(e.target.value)}
            >
              <option value="Nearby">Nearby</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Custom">Custom Location...</option>
            </select>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Find plumber, electrician, cleaner..."
              className="w-full p-4 pr-12 rounded-xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-primary"
            >
              <FiSearch size={20} />
            </button>
          </form>
        </div>

        {/* Categories Grid */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className={`flex flex-col items-center p-4 rounded-xl shadow-sm transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-primary/10 border border-primary' 
                    : 'bg-white hover:shadow-md'
                }`}
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-xs text-center text-black">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Top Trusted Providers */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Trusted Near You</h2>
            <button 
              onClick={handleSeeAllProviders}
              className="text-sm text-primary hover:underline"
            >
              See All
            </button>
          </div>
          <div className="space-y-4">
            {topProviders.map((provider) => (
              <div key={provider.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-4">
                    {provider.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{provider.name}</h3>
                    <p className="text-sm text-foreground/80">{provider.service} • {provider.distance} away</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm ml-1">{provider.rating}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBookNow(provider.id, provider.name)}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Top 10 Most Trusted This Month</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-center text-foreground/80 py-8">Featured providers will be shown here</p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4">
        <a href="/" className="flex flex-col items-center text-primary">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="/chat" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">💬</span>
          <span className="text-xs mt-1">Chats</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </a>
      </nav>
    </div>
  );
}
