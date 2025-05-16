
import React, { useState } from 'react';

// Mock review data
const mockReviews = [
  {
    id: '1',
    author: 'Jessica Thompson',
    avatar: '/placeholder.svg',
    rating: 5,
    date: '2023-05-15',
    title: 'Best trip of my life!',
    content: 'This trip exceeded all my expectations. Our tour guide was fantastic and the group dynamic was amazing. I made friends that I know I'll keep for a lifetime. The itinerary was perfect - a great mix of must-see attractions and hidden gems.',
    helpful: 24,
    tripDate: 'April 2023'
  },
  {
    id: '2',
    author: 'Mark Wilson',
    avatar: '/placeholder.svg',
    rating: 4,
    date: '2023-04-22',
    title: 'Great experience with minor issues',
    content: 'Overall a fantastic trip! The destinations were amazing and our group was so fun. There were a couple of accommodation issues and one activity got canceled due to weather, but our guide handled it professionally. Would definitely travel with Contiki again.',
    helpful: 18,
    tripDate: 'March 2023'
  },
  {
    id: '3',
    author: 'Sophia Rodriguez',
    avatar: '/placeholder.svg',
    rating: 5,
    date: '2023-03-10',
    title: 'Life-changing adventure!',
    content: 'I cannot say enough good things about this trip! As a solo traveler I was a bit nervous, but from day one I felt comfortable with the group. Our guide was knowledgeable and fun, the accommodations were better than I expected, and the included activities were all fantastic.',
    helpful: 32,
    tripDate: 'February 2023'
  },
  {
    id: '4',
    author: 'David Chen',
    avatar: '/placeholder.svg',
    rating: 3,
    date: '2023-02-18',
    title: 'Good trip but room for improvement',
    content: 'The destinations were incredible and most activities were great. However, some accommodations were quite far from city centers, and there were a few long travel days that could have been broken up better. Our tour guide was excellent though, and really tried to make everything work for everyone.',
    helpful: 15,
    tripDate: 'January 2023'
  }
];

const Reviews = () => {
  const [helpfulMarked, setHelpfulMarked] = useState<string[]>([]);

  const handleMarkHelpful = (reviewId: string) => {
    if (!helpfulMarked.includes(reviewId)) {
      setHelpfulMarked([...helpfulMarked, reviewId]);
    }
  };

  return (
    <section className="py-12 bg-bgLight">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="heading-md mb-4 md:mb-0">Customer Reviews</h2>
          <button className="btn-outline px-4 py-2">
            Write a Review
          </button>
        </div>
        
        {/* Review summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.6</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= 4.6 ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">Based on {mockReviews.length} reviews</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              {/* Rating bars */}
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = mockReviews.filter(r => Math.floor(r.rating) === rating).length;
                const percentage = (count / mockReviews.length) * 100;
                
                return (
                  <div key={rating} className="flex items-center">
                    <span className="w-8 text-sm text-gray-600">{rating}★</span>
                    <div className="flex-1 h-4 mx-2 bg-gray-200 rounded">
                      <div 
                        className="h-4 bg-accent rounded" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-gray-600">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Review list */}
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={review.avatar} 
                      alt={review.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <p className="text-sm text-gray-500">Trip date: {review.tripDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.content}</p>
              
              <button 
                className={`flex items-center text-sm ${
                  helpfulMarked.includes(review.id) 
                    ? "text-accent font-medium" 
                    : "text-gray-600 hover:text-accent"
                }`}
                onClick={() => handleMarkHelpful(review.id)}
                disabled={helpfulMarked.includes(review.id)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-1"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                Helpful ({helpfulMarked.includes(review.id) ? review.helpful + 1 : review.helpful})
              </button>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 rounded-md bg-accent text-white">1</button>
            <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
