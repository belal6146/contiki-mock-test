import React from 'react';

interface PromotionCardProps {
  title: string;
  subtitle: string;
  bgImage: string;
  buttonText: string;
  buttonLink: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  subtitle,
  bgImage,
  buttonText,
  buttonLink
}) => {
  return (
    <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4 opacity-90">{subtitle}</p>
        
        <a 
          href={buttonLink}
          className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wide transition-colors duration-200 w-fit"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default PromotionCard;
