
import React from 'react';

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
  }
];

const Reviews = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="heading-md mb-6">Traveler Reviews</h2>
      
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={review.avatar}
                  alt={`${review.author}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
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
    </div>
  );
};

export default Reviews;
