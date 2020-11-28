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
  const actualYear = () => new Date().getFullYear();

  const [trainings, setTrainings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(actualYear);

  const todayYear = () => setCurrentYear(actualYear);
  const addYear = () => setCurrentYear(currentYear + 1);
  const subtractYear = () => setCurrentYear(currentYear - 1);

  useEffect(() => {
    if (isAuthorized === true) {
      const fetchTranings = async () => {
        let response: any = await getAllTrainings();

        if (response?.data) {
          setTrainings(response.data);
          setIsLoading(false);
        }
      };

      fetchTranings();
    }
  }, [isAuthorized]);

  return (
    <div className="calendar">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="calendar__switchYear">
            <button className="calendar__actualYear" type="submit" onClick={todayYear}>
              &#x2738;
            </button>
            <button className="calendar__subtractYear" type="submit" onClick={subtractYear}>
              &#10148;
            </button>
            <h2 className="calendar__year">{currentYear}</h2>
            <button className="calendar__addYear" type="submit" onClick={addYear}>
              &#10148;
            </button>
          </div>

          <div className="calendar__tilesContainer">
            {[...Array(13)].map((_, i) => (
              <CalendarTiles key={i} className={`month${i}`} month={i} year={currentYear} trainings={trainings} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Calendar;
