
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const mockReviews = [
  {
    id: 1,
    author: "John O'Connor",
    rating: 5,
    date: "2023-05-15",
    comment: "Amazing experience! The tour guide was knowledgeable and the destinations were breathtaking. Would definitely recommend to anyone looking for an adventure.",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    author: "Maria Garcia",
    rating: 4,
    date: "2023-04-22",
    comment: "Loved the islands, can't wait to go back. The only reason for 4 stars instead of 5 was that some of the accommodations weren't as nice as expected.",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    author: "David Kim",
    rating: 5,
    date: "2023-06-03",
    comment: "This trip exceeded all my expectations. The itinerary was perfectly balanced between scheduled activities and free time to explore.",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    author: "Sophie Martin",
    rating: 5,
    date: "2023-03-28",
    comment: "I had the time of my life on this tour! Made so many new friends and the destinations were absolutely gorgeous.",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    author: "James Wilson",
    rating: 4,
    date: "2023-07-12",
    comment: "Great trip overall. The tour guide was excellent and very knowledgeable about all the places we visited.",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    author: "Emma Johnson",
    rating: 5,
    date: "2023-08-05",
    comment: "Couldn't have asked for a better experience! The activities were perfect and our guide made sure everything went smoothly.",
    avatar: "/placeholder.svg"
  }
];

const TourReviewsTab: React.FC = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    console.debug('[TourReviewsTab] mounted', { initialReviewsShown: visibleReviews });
  }, []);

  const handleLoadMore = () => {
    console.debug('[TourReviewsTab] loadMore clicked', { currentlyShowing: visibleReviews });
    setLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + 3, mockReviews.length));
      setLoadingMore(false);
      console.debug('[TourReviewsTab] loadedMore', { nowShowing: visibleReviews + 3 });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="heading-md mb-6">Traveler Reviews</h2>
      
      <div className="space-y-6">
        {mockReviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatar} alt={`${review.author}'s avatar`} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{review.author}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleReviews < mockReviews.length && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? "Loading..." : "Load More Reviews"}
          </Button>
        </div>
      )}

      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Trip Rating Overview</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-lg font-bold">4.8 out of 5</span>
          <span className="ml-2 text-sm text-gray-500">Based on {mockReviews.length} reviews</span>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex items-center">
            <span className="w-20 text-sm">5 stars</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="w-10 text-sm text-right">75%</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm">4 stars</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <span className="w-10 text-sm text-right">25%</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm">3 stars</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <span className="w-10 text-sm text-right">0%</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm">2 stars</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <span className="w-10 text-sm text-right">0%</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm">1 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <span className="w-10 text-sm text-right">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourReviewsTab;
