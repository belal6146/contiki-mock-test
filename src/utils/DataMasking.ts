
/**
 * Utility functions for masking personal data in accordance with GDPR
 */

/**
 * Masks a full name to show only initials
 */
export const maskName = (name: string): string => {
  if (!name) return '';
  
  const parts = name.split(' ');
  return parts.map(part => `${part[0]}.`).join(' ');
};

/**
 * Converts exact age to an age range for privacy
 */
export const maskAge = (age: number): string => {
  if (!age) return '';
  
  const ranges = [
    { max: 18, label: 'Under 18' },
    { max: 25, label: '18-25' },
    { max: 35, label: '26-35' },
    { max: 45, label: '36-45' },
    { max: 100, label: 'Over 45' }
  ];
  
  const range = ranges.find(r => age <= r.max);
  return range ? range.label : 'Adult';
};

/**
 * Masks location to only show country
 */
export const maskLocation = (location: string): string => {
  if (!location) return '';
  
  // If location contains multiple parts (city, country), return only country
  if (location.includes(',')) {
    return location.split(',').pop()?.trim() || location;
  }
  
  return location;
};
