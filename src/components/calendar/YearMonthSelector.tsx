import React from 'react';
import styles from './YearMonthSelector.module.css';

interface YearMonthSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) => {
  return (
    <div className={styles.yearAndMonthSelector}>
      <div className={styles.yearAndMonthSelector__yearSelector} style={{ display: 'flex' }}>
        <div className={styles.optionSwitchWrapper} style={{ '--optionsCount': 2, '--itemWidth': '70px' } as React.CSSProperties}>
          <fieldset className={styles.yearSelector} data-testid="option-switch">
            <input
              type="radio"
              name="year-2025"
              id="year-2025"
              value="2025"
              checked={selectedYear === 2025}
              onChange={() => onYearChange(2025)}
            />
            <label
              className={`${styles.optionSwitch__label} ${selectedYear === 2025 ? styles.optionSwitch__labelActive : ''}`}
              htmlFor="year-2025"
              data-item-name="year-selector"
              data-item-type="General Interaction"
              style={{ height: '40px', position: 'relative', width: '70px' }}
            >
              <iframe
                src="about:blank"
                aria-hidden="true"
                tabIndex={-1}
                frameBorder="0"
                style={{
                  display: 'block',
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: -1
                }}
              />
              <p className={`${styles.optionSwitch__text} ${selectedYear === 2025 ? styles.optionSwitch__textActive : ''} ${styles.textH5}`} data-testid="genericText">
                2025
              </p>
            </label>
            <input
              type="radio"
              name="year-2026"
              id="year-2026"
              value="2026"
              checked={selectedYear === 2026}
              onChange={() => onYearChange(2026)}
            />
            <label
              className={styles.optionSwitch__label}
              htmlFor="year-2026"
              data-item-name="year-selector"
              data-item-type="General Interaction"
              style={{ height: '40px', position: 'relative', width: '70px' }}
            >
              <p className={`${styles.optionSwitch__text} ${styles.textH5}`} data-testid="genericText">
                2026
              </p>
            </label>
            <span className={styles.first} style={{ left: selectedYear === 2025 ? '0px' : '70px', height: '40px', width: '70px' }} />
          </fieldset>
        </div>
      </div>
      <div className={styles.yearAndMonthSelector__monthSelector}>
        <div className={`${styles.reactMultiCarouselList} ${styles.monthsForm}`}>
          <ul className={styles.reactMultiCarouselTrack} style={{ transition: 'none', overflow: 'unset', transform: 'translate3d(0px, 0px, 0px)' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <li
                key={month}
                data-index={index}
                aria-hidden="false"
                className={`${styles.reactMultiCarouselItem} ${styles.reactMultiCarouselItemActive}`}
                style={{ flex: '1 1 auto', position: 'relative', width: '92px' }}
              >
                <label className={styles.monthsForm__label}>
                  <input
                    type="radio"
                    name="month"
                    value={index + 1}
                    checked={selectedMonth === index + 1}
                    onChange={() => onMonthChange(index + 1)}
                    className={selectedMonth === index + 1 ? styles.monthsForm__inputActive : ''}
                  />
                  <p className={`${styles.monthsForm__text} ${styles.textLabelL}`} data-item-type="General Interaction" data-item-name="month-selector" data-testid="genericText">
                    {month}
                  </p>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YearMonthSelector; 