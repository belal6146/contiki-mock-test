
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface TripCardProps {
  id: string;
  title: string;
  region: string;
  price: number;
}

const TripCard = ({ id, title, region, price }: TripCardProps) => {
  useEffect(() => {
    console.debug('[TripCard] mounted', { id });
  }, [id]);

  const handleClick = () => {
    console.debug('[TripCard] clicked', { id });
    trackEvent('trip_card_click', { id, title, region });
  };

  return (
    <Link to={`/tours/${id}`} onClick={handleClick} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <h3 className="font-montserrat font-medium text-lg">{title}</h3>
        <p className="font-montserrat text-gray-600">{region}</p>
        <p className="font-montserrat font-bold mt-2">
          From {formatCurrency(price)}
        </p>
      </div>
    </Link>
  );
};

export default TripCard;
