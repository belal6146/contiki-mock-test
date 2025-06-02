import React, { useState, useEffect } from 'react';
import styles from './YearMonthSelector.module.css';
import cn from 'classnames';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
  onMonthChange
}) => {
  const years = [2025, 2026];
  const months = [
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 4 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 },
    { label: 'Aug', value: 8 },
    { label: 'Sep', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dec', value: 12 }
  ];

  // Find the index of the selected month for initial carousel position
  const initialMonthIndex = months.findIndex(month => month.value === selectedMonth);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 12,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1
    }
  };

  return (
    <div className={styles['year-and-month-selector']}>
      {/* Year Selector */}
      <div className={styles['year-and-month-selector__year-selector']}>
        <div 
          className={styles['option-switch-wrapper']} 
          style={{ '--optionsCount': years.length, '--itemWidth': '70px' } as React.CSSProperties}
        >
          <fieldset className={styles['option-switch']}>
            {years.map((year) => (
              <React.Fragment key={year}>
                <input
                  type="radio"
                  name={`year-${year}`}
                  id={`year-${year}`}
                  value={year}
                  checked={selectedYear === year}
                  onChange={() => onYearChange(year)}
                />
                <label
                  className={cn(
                    styles['option-switch__label'],
                    selectedYear === year && styles['option-switch__label--active']
                  )}
                  htmlFor={`year-${year}`}
                  data-item-name="year-selector"
                  data-item-type="General Interaction"
                >
                  <p className={cn(
                    styles['option-switch__text'],
                    selectedYear === year && styles['option-switch__text--active']
                  )}>
                    {year}
                  </p>
                </label>
              </React.Fragment>
            ))}
            <span className={styles.first} />
          </fieldset>
        </div>
      </div>

      {/* Month Selector */}
      <div className={styles['year-and-month-selector__month-selector']}>
        <Carousel
          responsive={responsive}
          infinite={false}
          showDots={false}
          arrows={false}
          containerClass={styles['months-form']}
          itemClass={styles['months-form__label']}
          sliderClass={styles['months-form__track']}
          partialVisible={true}
          keyBoardControl={true}
          rewind={true}
          rewindWithAnimation={true}
          // Center the initial active month if possible
          additionalTransfrom={-initialMonthIndex * (responsive.desktop.items > 0 ? 100 / responsive.desktop.items : 0)}
        >
          {months.map((month) => (
            <div key={month.value}>
              <input
                type="radio"
                name="month"
                value={month.value}
                checked={selectedMonth === month.value}
                onChange={() => onMonthChange(month.value)}
                className={selectedMonth === month.value ? styles['months-form__input-active'] : ''}
              />
              <p 
                className={cn(
                  styles['months-form__text'],
                  selectedMonth === month.value && styles['months-form__text--active']
                )}
                data-item-type="General Interaction"
                data-item-name="month-selector"
              >
                {month.label}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default YearMonthSelector; 