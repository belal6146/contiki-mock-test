import React from 'react';
import styles from './StickyHeaderButtons.module.css';
import cn from 'classnames';

interface StickyHeaderButtonsProps {
  // Define props if needed, e.g., onViewDates, onRequestInfo
}

const StickyHeaderButtons: React.FC<StickyHeaderButtonsProps> = () => {
  return (
    <div className={styles.stickyHeader__buttons} data-testid="sticky-header-buttons">
      <button data-testid="dates-prices-button" className={cn(styles.btn, styles['btn--L'], styles['btn-pr'], styles['btn--icon-Left'])} disabled data-item-type="Booking Interest" data-item-name="dates-and-prices">
        <p className={styles['text-button-l']} data-testid="genericText">VIEW DATES</p>
      </button>
      <button data-testid="easy-quote-button" className={cn(styles.btn, styles['btn--L'], styles.stickyHeader__easyQuoteButton, styles['btn-sec-booking'], styles['btn--icon-Left'])} data-item-type="Booking Interest" data-item-name="raq">
        <p className={styles['text-button-l']} data-testid="genericText">REQUEST MORE INFO</p>
      </button>
    </div>
  );
};

export default StickyHeaderButtons; 