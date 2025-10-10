'use client';

import { useState } from 'react';
import { FiStar, FiChevronLeft, FiFilter, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

type Review = {
  id: string;
  reviewerName: string;
  reviewerImage: string;
  rating: number;
  date: string;
  review: string;
  service: string;
  isVerified: boolean;
};

type FilterType = 'all' | '5' | '4' | '3' | '2' | '1' | 'with-photos';

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      reviewerName: 'Alex Johnson',
      reviewerImage: 'AJ',
      rating: 5,
      date: '2023-10-05',
      review: 'Excellent service! The plumber arrived on time and fixed the issue quickly. Very professional and knowledgeable.',
      service: 'Plumbing - Leaky Faucet',
      isVerified: true,
    },
    {
      id: '2',
      reviewerName: 'Sarah Williams',
      reviewerImage: 'SW',
      rating: 4,
      date: '2023-10-03',
      review: 'Good service overall. The electrician was professional but arrived 15 minutes late.',
      service: 'Electrical - Outlet Installation',
      isVerified: true,
    },
    {
      id: '3',
      reviewerName: 'Michael Brown',
      reviewerImage: 'MB',
      rating: 5,
      date: '2023-09-28',
      review: 'Outstanding work! The cleaner left my apartment spotless. Will definitely book again.',
      service: 'Cleaning - Deep Cleaning',
      isVerified: false,
    },
    {
      id: '4',
      reviewerName: 'Emily Davis',
      reviewerImage: 'ED',
      rating: 3,
      date: '2023-09-25',
      review: 'The service was okay. The technician was skilled but the job took longer than expected.',
      service: 'AC Repair',
      isVerified: true,
    },
    {
      id: '5',
      reviewerName: 'David Wilson',
      reviewerImage: 'DW',
      rating: 5,
      date: '2023-09-20',
      review: 'Amazing job! The carpenter did exactly what I wanted and even gave me some great suggestions.',
      service: 'Carpentry - Bookshelf Installation',
      isVerified: true,
    },
  ]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Filter reviews based on active filter and search query
  const filteredReviews = reviews.filter(review => {
    // Filter by rating
    if (activeFilter !== 'all' && activeFilter !== 'with-photos') {
      if (review.rating !== parseInt(activeFilter)) return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        review.reviewerName.toLowerCase().includes(query) ||
        review.review.toLowerCase().includes(query) ||
        review.service.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Count reviews by rating
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-5 h-5`} 
      />
    ));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <FiChevronLeft size={24} className="text-foreground/80" />
            </Link>
            <h1 className="text-xl font-bold">Reviews & Ratings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="text-4xl font-bold text-foreground">{averageRating}</div>
              <div className="flex justify-center md:justify-start my-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <p className="text-foreground/70 text-sm">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-foreground/40" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Rating Breakdown */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground/80 mb-3">Rating Breakdown</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating as keyof typeof ratingCounts];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center">
                    <div className="w-8 text-sm font-medium text-foreground/80">{rating} star</div>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-foreground/60">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-foreground/80 border border-gray-200 hover:border-gray-300'
            }`}
          >
            All Reviews
          </button>
          
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setActiveFilter(rating.toString() as FilterType)}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap flex items-center ${
                activeFilter === rating.toString()
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground/80 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{rating}</span>
              <FiStar className="ml-1 w-3.5 h-3.5" />
              <span className="ml-1">({ratingCounts[rating as keyof typeof ratingCounts]})</span>
            </button>
          ))}
          
          <button
            onClick={() => setActiveFilter('with-photos')}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap flex items-center ${
              activeFilter === 'with-photos'
                ? 'bg-primary text-white'
                : 'bg-white text-foreground/80 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <FiFilter className="mr-1 w-3.5 h-3.5" />
            With Photos
          </button>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                    {review.reviewerImage}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{review.reviewerName}</h3>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-foreground/60">
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                      {review.isVerified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-2 text-foreground/80 text-sm">
                      {review.review}
                    </p>
                    
                    <div className="mt-2">
                      <span className="inline-block bg-gray-100 text-foreground/70 text-xs px-2 py-0.5 rounded">
                        {review.service}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-foreground/70">No reviews found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
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
        <Link href="/reviews" className="flex flex-col items-center text-primary">
          <span className="text-2xl">⭐</span>
          <span className="text-xs mt-1">Reviews</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-foreground/80">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
