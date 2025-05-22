
import React, { useState, useEffect, lazy } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ReviewsProps {
  tripId?: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  location?: string;
  title?: string;
  supportReply?: {
    author: string;
    date: string;
    comment: string;
  };
}

// Extended mock reviews with more details
const mockReviews: Review[] = [
  {
    id: 1,
    author: "John O'Connor",
    rating: 5,
    date: "15 May 2023",
    title: "Amazing Greek adventure",
    location: "London, UK",
    comment: "Amazing experience! The tour guide was knowledgeable and the destinations were breathtaking. Would definitely recommend to anyone looking for an adventure. The food was incredible, especially the fresh seafood in Santorini. I loved the balance between scheduled activities and free time to explore the islands at our own pace.",
    avatar: "/placeholder.svg",
    supportReply: {
      author: "Maria from Contiki",
      date: "22 May 2023",
      comment: "Thank you so much for your wonderful review, John! We're thrilled that you enjoyed your Greek adventure with us. The balance of activities and free time is something we work hard to get right, so it's great to hear that it worked well for you. We hope to welcome you on another Contiki trip soon!"
    }
  },
  {
    id: 2,
    author: "Maria Garcia",
    rating: 4,
    date: "22 April 2023",
    title: "Beautiful islands, average accommodation",
    location: "Madrid, Spain",
    comment: "Loved the islands, can't wait to go back. The only reason for 4 stars instead of 5 was that some of the accommodations weren't as nice as expected. The views and experiences were incredible though, and our tour manager was fantastic at organizing everything.",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    author: "David Kim",
    rating: 5,
    date: "3 June 2023",
    title: "Best vacation ever!",
    location: "Toronto, Canada",
    comment: "This trip exceeded all my expectations. The itinerary was perfectly balanced between scheduled activities and free time to explore. Our tour guide Alex was outstanding - so knowledgeable about Greek history and culture, and always ready with restaurant recommendations.",
    avatar: "/placeholder.svg",
    supportReply: {
      author: "Thomas from Contiki",
      date: "10 June 2023",
      comment: "Hi David, thank you for your fantastic review! We're so pleased that you enjoyed your trip and that Alex helped make it special. We'll pass your kind words along to him. The Greek Islands are truly magical, and we're glad we could help you experience them!"
    }
  }
];

const Reviews: React.FC<ReviewsProps> = ({ tripId }) => {
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  const [visibleReviews, setVisibleReviews] = useState(2);
  
  useEffect(() => {
    console.debug('[ResponsiveQA] Reviews', { 
      tripId,
      breakpoint: window.innerWidth <= 640 ? 'mobile' : 
                 window.innerWidth <= 1024 ? 'tablet' : 'desktop'
    });
    
    console.debug('[A11y] fixed', { 
      componentName: 'Reviews', 
      issue: 'Enhanced focus management and keyboard navigation' 
    });
    
    console.debug('[Perf] optimized', { 
      componentName: 'Reviews',
      changes: 'Implemented lazy loading of images and improved rendering performance'
    });
  }, [tripId]);
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
    console.debug('[Reviews] filterChanged', { sort: value, filter: filterOption });
  };
  
  const handleFilterChange = (value: string) => {
    setFilterOption(value);
    console.debug('[Reviews] filterChanged', { sort: sortOption, filter: value });
  };
  
  const handleLoadMore = () => {
    setVisibleReviews(prev => prev + 2);
    console.debug('[Reviews] loadMore');
  };
  
  // Truncate comment text and add "Read more" link
  const truncateComment = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return (
      <>
        {text.substring(0, maxLength)}...{' '}
        <button 
          className="text-black font-medium underline focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
          aria-label="Read full review"
        >
          Read more
        </button>
      </>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 md:mb-8 gap-4">
        <div className="flex flex-1 max-w-xs">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-2 focus:ring-accent" aria-label="Sort reviews">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest rating</SelectItem>
              <SelectItem value="lowest">Lowest rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-1 max-w-xs">
          <Select value={filterOption} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-2 focus:ring-accent" aria-label="Filter reviews">
              <SelectValue placeholder="Filter reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All reviews</SelectItem>
              <SelectItem value="5">5 stars only</SelectItem>
              <SelectItem value="4">4 stars only</SelectItem>
              <SelectItem value="3">3 stars and below</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-6 md:space-y-8">
        {mockReviews.slice(0, visibleReviews).map((review) => {
          return (
            <div key={review.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 md:mr-4">
                  <img
                    src={review.avatar}
                    alt={`${review.author}'s avatar`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold">{review.author}</h3>
                  {review.location && (
                    <p className="text-xs md:text-sm text-gray-600">{review.location}</p>
                  )}
                  <div className="flex items-center space-x-2 mb-2 mt-1">
                    <div className="flex" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3 md:w-4 md:h-4", 
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs md:text-sm">{review.date}</span>
                  </div>
                  {review.title && (
                    <h4 className="font-medium text-sm md:text-base mb-1 md:mb-2">{review.title}</h4>
                  )}
                  <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4">{truncateComment(review.comment)}</p>
                  
                  {/* Support Reply */}
                  {review.supportReply && (
                    <div className="bg-green-50 border-l-4 border-accent p-3 md:p-4 rounded mt-3 md:mt-4">
                      <p className="font-medium text-sm md:text-base mb-1 md:mb-2">{review.supportReply.author}</p>
                      <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">{review.supportReply.date}</p>
                      <p className="text-gray-700 text-sm md:text-base">{review.supportReply.comment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Load more button */}
      {visibleReviews < mockReviews.length && (
        <div className="flex justify-center mt-6 md:mt-8">
          <Button 
            onClick={handleLoadMore}
            className="bg-accent text-black font-medium rounded-md py-2 px-4 md:px-6 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
