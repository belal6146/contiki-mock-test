
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  };

  return (
    <Link to={`/tours/${id}`} onClick={handleClick}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-gray-600">{region}</p>
        <p className="font-bold mt-2">£{price}</p>
      </div>
    </Link>
  );
};

export default TripCard;
