import React from 'react';
import styles from './RatingStars.module.css';
import cn from 'classnames';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn(styles.ratingStars, styles['ratingStars--static'])} data-testid="rating-stars" style={{ minWidth: '106px' }}>
      {/* Render full stars in the base layer */}
      {Array.from({ length: totalStars }).map((_, index) => (
        <span key={index} className={styles.ratingStars__star} data-testid="rating-stars-star"></span>
      ))}
      {/* Render active stars (full and half) in the overlay */}
      <div className={styles.ratingStars__boxActive} style={{ width: `${(rating / totalStars) * 100}%` }}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} className={styles.ratingStars__star} data-testid="rating-stars-star"></span>
        ))}
        {hasHalfStar && (
          <span className={cn(styles.ratingStars__star, styles['ratingStars__star--half'])} data-testid="rating-stars-star"></span>
        )}
      </div>
    </div>
  );
};

export default RatingStars; 