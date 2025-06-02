import React from 'react';
import styles from './CalendarViewSwitch.module.css';
import { cn } from '../../lib/utils';

interface CalendarViewSwitchProps {
  view: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
}

const CalendarViewSwitch: React.FC<CalendarViewSwitchProps> = ({
  view,
  onViewChange
}) => {
  return (
    <div className={styles.calendarViewSwitch}>
      <p className={styles.calendarViewSwitch__text}>View:</p>
      <div className={styles.calendarViewSwitch__wrapper}>
        <span 
          className={cn(
            styles.calendarViewSwitch__iconBox,
            view === 'list' && styles['calendarViewSwitch__iconBox--selected']
          )}
          data-testid="list"
          data-item-type="General Interaction"
          data-item-name="list-view"
          onClick={() => onViewChange('list')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 22 22" 
            fill="none"
            className={styles.calendarViewSwitch__icon}
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M1.29412 7.20603H3.88235C4.59412 7.20603 5.17647 6.63634 5.17647 5.94004V3.40807C5.17647 2.71178 4.59412 2.14209 3.88235 2.14209H1.29412C0.582353 2.14209 0 2.71178 0 3.40807V5.94004C0 6.63634 0.582353 7.20603 1.29412 7.20603ZM3.88235 13.5359H1.29412C0.582353 13.5359 0 12.9662 0 12.27V9.73798C0 9.04169 0.582353 8.472 1.29412 8.472H3.88235C4.59412 8.472 5.17647 9.04169 5.17647 9.73798V12.27C5.17647 12.9662 4.59412 13.5359 3.88235 13.5359ZM3.88235 19.8658H1.29412C0.582353 19.8658 0 19.2962 0 18.5999V16.0679C0 15.3716 0.582353 14.8019 1.29412 14.8019H3.88235C4.59412 14.8019 5.17647 15.3716 5.17647 16.0679V18.5999C5.17647 19.2962 4.59412 19.8658 3.88235 19.8658ZM20.7059 13.5359H7.76471C7.05294 13.5359 6.47059 12.9662 6.47059 12.27V9.73798C6.47059 9.04169 7.05294 8.472 7.76471 8.472H20.7059C21.4177 8.472 22 9.04169 22 9.73798V12.27C22 12.9662 21.4177 13.5359 20.7059 13.5359ZM7.76471 19.8658H20.7059C21.4177 19.8658 22 19.2962 22 18.5999V16.0679C22 15.3716 21.4177 14.8019 20.7059 14.8019H7.76471C7.05294 14.8019 6.47059 15.3716 6.47059 16.0679V18.5999C6.47059 19.2962 7.05294 19.8658 7.76471 19.8658ZM6.47059 5.94004V3.40807C6.47059 2.71178 7.05294 2.14209 7.76471 2.14209H20.7059C21.4177 2.14209 22 2.71178 22 3.40807V5.94004C22 6.63634 21.4177 7.20603 20.7059 7.20603H7.76471C7.05294 7.20603 6.47059 6.63634 6.47059 5.94004Z"
            />
          </svg>
        </span>
        <span 
          className={cn(
            styles.calendarViewSwitch__iconBox,
            view === 'calendar' && styles['calendarViewSwitch__iconBox--selected']
          )}
          data-testid="calendar"
          data-item-type="General Interaction"
          data-item-name="calendar-view"
          onClick={() => onViewChange('calendar')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="21" 
            height="22" 
            viewBox="0 0 21 22"
            className={styles.calendarViewSwitch__icon}
          >
            <path d="M2.8,19.6h15.4V8.8H2.8V19.6z M13.8,9.9H16v2.2h-2.2V9.9z M9.4,9.9h2.2v2.2H9.4V9.9z M5,9.9h2.2v2.2H5V9.9z" />
            <rect x="13.8" y="9.9" width="2.2" height="2.2" />
            <rect x="5" y="9.9" width="2.2" height="2.2" />
            <rect x="9.4" y="9.9" width="2.2" height="2.2" />
            <path d="M18.2,2.4h-1.1V0.2h-2.2v2.2H6.1V0.2H3.9v2.2H2.8c-1.2,0-2.2,1-2.2,2.2l0,15.1c0,1.2,1,2.2,2.2,2.2h15.4c1.2,0,2.2-1,2.2-2.2V4.5C20.4,3.4,19.4,2.4,18.2,2.4z M18.2,19.6H2.8V8.8h15.4V19.6z M18.2,6.7H2.8V4.5h15.4V6.7z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CalendarViewSwitch; 