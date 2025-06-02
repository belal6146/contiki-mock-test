import React from 'react';
import styles from './StickyHeaderPricing.module.css';
import cn from 'classnames';

interface StickyHeaderPricingProps {
  // Define props if needed, e.g., oldPrice, currentPrice, findPriceLink
}

const StickyHeaderPricing: React.FC<StickyHeaderPricingProps> = () => {
  return (
    <div className={styles.stickyHeader__pricing} data-testid="sticky-header-pricing">
      <div className={styles.tripHeader__pricing} data-testid="trip-header-pricing">
        <div className={styles.tripHeader__prices} data-testid="trip-header-prices">
          <div className={styles.tripHeader__oldPriceWithDiscountTag} data-testid="trip-header-old-price-with-discount-tag">
            <div className={styles.tripHeader__oldPrice} data-testid="trip-header-old-price">
              <p className={cn(styles.tripHeader__oldPrice__text, styles['text-paragraph-m'])} data-testid="trip-header-old-price-text">Price</p>
              <p className={cn(styles.tripHeader__oldPrice__strikethrough, styles['text-strikethrough-m'])} data-testid="trip-header-old-price-strikethrough">£1,325</p>
            </div>
          </div>
          <div className={styles.tripHeader__price} data-testid="trip-header-price">
            <p className={cn(styles.tripHeader__priceFrom, styles['text-comm-m'])} data-testid="trip-header-price-from-text">From</p>
            <p className={cn(styles.tripHeader__priceCost, styles['text-comm-l'])} data-testid="trip-header-price-cost-text">£1,060</p>
          </div>
        </div>
        <div className={styles.tripHeader__findPrice} data-testid="trip-header-find-price">
          <a className={styles['text-link-m']} data-item-type="Booking Interest" data-item-name="find-this-price" data-testid="genericText">Find this price</a>
        </div>
      </div>
    </div>
  );
};

export default StickyHeaderPricing; 