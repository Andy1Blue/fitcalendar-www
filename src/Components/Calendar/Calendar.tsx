import * as React from 'react';
import { useEffect, useState } from 'react';
import './Calendar.scss';
import { getAllTrainings } from '../../Services/TrainingsService';

interface CalendarProps {
  isAuthorized: any;
}

const Calendar = ({ isAuthorized }: CalendarProps) => {
  const [trainings, setTrainings] = useState({});

  useEffect(() => {
    console.log('##', isAuthorized);
    if (isAuthorized === true) {
      const fetchTranings = async () => {
        let response: any = await getAllTrainings();
        console.log('##', response);
        setTrainings(response);
      };

      fetchTranings();

      console.log('##', trainings);
    }
  }, [isAuthorized]);

  return <div className="calendar"></div>;
};
export default Calendar;
