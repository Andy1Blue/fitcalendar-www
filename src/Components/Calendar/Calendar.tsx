import * as React from 'react';
import { useEffect, useState } from 'react';
import './Calendar.scss';
import { getAllTrainings } from '../../Services/TrainingsService';
import Loader from '../Loader/Loader';
import CalendarTiles from '../CalendarTiles/CalendarTiles';

interface CalendarProps {
  isAuthorized: any;
}

const Calendar = ({ isAuthorized }: CalendarProps) => {
  const [trainings, setTrainings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthorized === true) {
      const fetchTranings = async () => {
        let response: any = await getAllTrainings();

        if (response !== null) {
          setTrainings(response);

          if (response.data !== null) {
            setIsLoading(false);
          }
        }
      };

      fetchTranings();
    }
  }, [isAuthorized]);

  return (
    <div className="calendar">
      {isLoading && <Loader />}
      {!isLoading && trainings.data[0].trainingDate}
      <div className="calendar__tilesContainer">
        <CalendarTiles className="month1" month={1} />
        <CalendarTiles className="month2" month={2} />
        <CalendarTiles className="month3" month={3} />
        <CalendarTiles className="month4" month={4} />
        <CalendarTiles className="month5" month={5} />
        <CalendarTiles className="month6" month={6} />
        <CalendarTiles className="month7" month={7} />
        <CalendarTiles className="month8" month={8} />
        <CalendarTiles className="month9" month={9} />
        <CalendarTiles className="month10" month={10} />
        <CalendarTiles className="month11" month={11} />
        <CalendarTiles className="month12" month={12} />
      </div>
    </div>
  );
};
export default Calendar;
