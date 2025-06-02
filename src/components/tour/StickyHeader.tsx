import React, { useState } from 'react';
import styles from './StickyHeader.module.css';
import RatingStars from './RatingStars';
import StickyHeaderTabs from './StickyHeaderTabs';
import StickyHeaderPricing from './StickyHeaderPricing';
import StickyHeaderButtons from './StickyHeaderButtons';

const StickyHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dates-pricing');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId}`);
  };

  const tabs = [
    { id: 'the-trip', label: 'THE TRIP' },
    { id: 'dates-pricing', label: 'DATES & PRICING' },
    { id: 'reviews', label: 'REVIEWS' },
  ];

  return (
    <div className={styles.stickyHeader__container} data-testid="sticky-header-container">
      <div className={styles.stickyHeader__containerTop} data-testid="sticky-header-container-top">
        <div className={styles.stickyHeader__overview} data-testid="sticky-header-overview">
          <div className={styles.stickyHeader__info} data-testid="sticky-header-info">
            <div className={styles.stickyHeader__title} data-testid="sticky-header-title">
              {/* Trip Header Info (Feefo Rating, Reviews, Title, Variants) */}
              <div className={styles.tripHeader__feefo} data-testid="trip-header-feefo">
                <div className={styles.tripHeader__rating} data-testid="trip-header-rating">
                  {/* Rating Stars Component */}
                  <RatingStars rating={4.6} />
                  <p className={`${styles.tripHeader__ratingText} ${styles.textDefault}`} data-testid="trip-header-rating-text">4.6</p>
                </div>
                <div className={styles.tripHeader__reviews} data-testid="trip-header-reviews">
                  <a className={`${styles.richText} ${styles['text-link-m']}`} data-testid="trip-header-reviews-text"><p>435 Reviews</p></a>
                </div>
              </div>
              <p className={`${styles.tripHeader__title} ${styles['trip-header__title-desktop']} ${styles.textDefault}`} data-testid="trip-header-title-text">European Horizon</p>
              <div className={styles.headerVariants} data-testid="header-variants">
                <p className={`${styles.headerVariants__name} ${styles['text-subtitle-s']}`} data-testid="header-variants-name-text">Standard</p>
                <span className={styles.headerVariants__buttonWrapper}></span>
              </div>
            </div>
          </div>
          <StickyHeaderTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className={styles.stickyHeader__deals} data-testid="sticky-header-deals">
          <StickyHeaderPricing />
          <StickyHeaderButtons />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader; 