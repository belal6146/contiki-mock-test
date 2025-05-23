
import React from 'react';
import { Star, Phone, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  rating?: number;
  reviewCount?: number;
}

interface TripTeamProps {
  teamMembers: TeamMember[];
}

const TripTeam: React.FC<TripTeamProps> = ({ 
  teamMembers = [
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Trip Manager',
      image: 'https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720',
      bio: 'With over 5 years of experience guiding tours across Europe, Alex knows all the best local spots and hidden gems. Passionate about history, culture, and great food!',
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: '2',
      name: 'Maria Papadopoulos',
      role: 'Local Guide',
      image: 'https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=200&mode=crop&quality=80&width=300',
      bio: 'Born and raised in Athens, Maria brings authentic Greek knowledge and passion to every tour. She specializes in Greek mythology and knows the best tavernas in town.',
      rating: 4.8,
      reviewCount: 95
    }
  ]
}) => {
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <Star className="absolute top-0 left-0 w-4 h-4 fill-yellow-400 text-yellow-400 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Your Trip Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our passionate Trip Managers and local Guides will make your adventure unforgettable with their knowledge, energy, and insider access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <div className="text-[#FF6900] font-medium">{member.role}</div>
                  
                  {member.rating && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {renderRating(member.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {member.rating} ({member.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">
                  {member.bio}
                </p>
                
                <div className="flex justify-between">
                  <button className="text-sm font-medium flex items-center gap-1 text-gray-700 hover:text-black">
                    <Phone className="w-4 h-4" />
                    <span>Contact</span>
                  </button>
                  
                  <button className="text-sm font-medium flex items-center gap-1 text-gray-700 hover:text-black">
                    <Mail className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripTeam;
