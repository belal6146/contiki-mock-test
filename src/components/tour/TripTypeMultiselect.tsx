import React, { useState } from 'react';
import styles from './TripTypeMultiselect.module.css';
import { cn } from '@/lib/utils';

interface TripType {
  id: string;
  label: string;
  color: string;
}

interface TripTypeMultiselectProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

const TripTypeMultiselect: React.FC<TripTypeMultiselectProps> = ({
  selectedTypes,
  onTypeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tripTypes: TripType[] = [
    { id: 'standard', label: 'Standard', color: '#ebff99' },
    { id: 'plus', label: 'Plus', color: '#e0e0ff' },
    { id: 'age-27-35', label: 'Age 27-35', color: '#ccf5ff' }
  ];

  const handleTypeToggle = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    onTypeChange(newSelectedTypes);
  };

  return (
    <div className={styles['variation-multiselect']}>
      <button
        className={cn(
          styles.btn,
          styles['btn--M'],
          styles['variation-multiselect__button'],
          styles['btn-ter'],
          styles['btn--icon-Left']
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles['icon-wrapper']}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className={styles.btn__icon}
          >
            <path d="M43,38.31l-8.46-8.46a16.69,16.69,0,1,0-4.71,4.71L38.31,43A3.33,3.33,0,1,0,43,38.31Zm-22.35-6A11.67,11.67,0,1,1,32.33,20.67,11.67,11.67,0,0,1,20.67,32.33Z" />
            <path d="M26.87,19.19H22.26V14.58a1.54,1.54,0,1,0-3.07,0v4.61H14.58a1.54,1.54,0,1,0,0,3.07h4.61v4.61a1.54,1.54,0,1,0,3.07,0V22.26h4.61a1.54,1.54,0,1,0,0-3.07Z" />
          </svg>
        </span>
        <p className={styles['text-label-l']}>Trip Type</p>
      </button>

      {isOpen && (
        <div className={styles['variation-multiselect__dropdown']}>
          {tripTypes.map(type => (
            <div
              key={type.id}
              className={cn(
                styles.checkbox,
                styles['variation-multiselect__checkbox'],
                selectedTypes.includes(type.id) && styles['checkbox--checked']
              )}
              style={{
                '--checkbox-component-background': type.color,
                '--checkbox-component-text': '#000000'
              } as React.CSSProperties}
            >
              <span className={styles.checkbox__label}>
                <span className={styles.checkbox__box}>
                  <span className={styles['icon-wrapper']}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      className={styles.checkbox__icon}
                    >
                      <path
                        d="M15.5067 0.493276C14.8499 -0.164425 13.782 -0.164425 13.1252 0.493276L5.89468 7.72294L2.87481 4.70391C2.21795 4.04621 1.15014 4.04621 0.493276 4.70391C-0.164425 5.36162 -0.164425 6.42775 0.493276 7.08545L4.70391 11.2961C5.03234 11.6254 5.46351 11.7896 5.89468 11.7896C6.32585 11.7896 6.75702 11.6254 7.08545 11.2961L15.5067 2.87481C16.1644 2.21711 16.1644 1.15098 15.5067 0.493276Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <div className={styles.checkbox__children}>
                <p className={styles['text-label-l']}>{type.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripTypeMultiselect; 