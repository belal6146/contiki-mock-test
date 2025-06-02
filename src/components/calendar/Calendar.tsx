import React, { useState } from 'react';
import YearMonthSelector from './YearMonthSelector';
import TripTypeFilter from './TripTypeFilter';
import ViewSwitch from './ViewSwitch';
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>(['standard']);
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list');

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleTripTypesChange = (types: string[]) => {
    setSelectedTripTypes(types);
  };

  const handleViewChange = (view: 'list' | 'calendar') => {
    setCurrentView(view);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <YearMonthSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
        <div className={styles.calendarControls}>
          <TripTypeFilter onTripTypesChange={handleTripTypesChange} />
          <ViewSwitch currentView={currentView} onViewChange={handleViewChange} />
        </div>
      </div>
      <div className={styles.calendarContent}>
        {currentView === 'list' ? (
          <div className={styles.listView}>
            {/* List view content will go here */}
          </div>
        ) : (
          <div className={styles.calendarView}>
            {/* Calendar view content will go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; 