import React, { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './TripTypeFilter.module.css';

interface TripType {
  id: string;
  label: string;
  backgroundColor: string;
  textColor: string;
}

interface TripTypeFilterProps {
  onTripTypesChange: (selectedTypes: string[]) => void;
}

const TripTypeFilter: React.FC<TripTypeFilterProps> = ({ onTripTypesChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['standard']);

  const tripTypes: TripType[] = [
    {
      id: 'standard',
      label: 'Standard',
      backgroundColor: '#ebff99',
      textColor: '#000000'
    },
    {
      id: 'plus',
      label: 'Plus',
      backgroundColor: '#e0e0ff',
      textColor: '#000000'
    },
    {
      id: 'age-27-35',
      label: 'Age 27-35',
      backgroundColor: '#ccf5ff',
      textColor: '#000000'
    }
  ];

  const handleTypeToggle = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    onTripTypesChange(newSelectedTypes);
  };

  return (
    <div className={styles.tripTypeFilter}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="btn"
      >
        <span className={styles.iconWrapper}>
          <Search className={styles.icon} />
        </span>
        <p className={styles.buttonText}>Trip Type</p>
      </button>

      {isOpen && (
        <div className={styles.checkboxContainer}>
          {tripTypes.map((type) => (
            <div
              key={type.id}
              className={styles.checkboxWrapper}
              style={{
                '--checkbox-component-background': type.backgroundColor,
                '--checkbox-component-text': type.textColor
              } as React.CSSProperties}
            >
              <div
                className={`${styles.checkbox} ${selectedTypes.includes(type.id) ? styles.checked : ''}`}
                onClick={() => handleTypeToggle(type.id)}
              >
                <span className={styles.checkboxLabel}>
                  <span className={styles.checkboxBox}>
                    {selectedTypes.includes(type.id) && (
                      <span className={styles.iconWrapper}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          className={styles.checkIcon}
                        >
                          <path
                            d="M15.5067 0.493276C14.8499 -0.164425 13.782 -0.164425 13.1252 0.493276L5.89468 7.72294L2.87481 4.70391C2.21795 4.04621 1.15014 4.04621 0.493276 4.70391C-0.164425 5.36162 -0.164425 6.42775 0.493276 7.08545L4.70391 11.2961C5.03234 11.6254 5.46351 11.7896 5.89468 11.7896C6.32585 11.7896 6.75702 11.6254 7.08545 11.2961L15.5067 2.87481C16.1644 2.21711 16.1644 1.15098 15.5067 0.493276Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </span>
                <div className={styles.checkboxChildren}>
                  <p className={styles.checkboxText}>{type.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripTypeFilter; 