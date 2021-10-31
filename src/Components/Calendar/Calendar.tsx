import * as React from 'react';
import { useEffect, useState } from 'react';
import './Calendar.scss';
import { getUserTrainings } from '../../Services/TrainingsService';
import Loader from '../Loader/Loader';
import CalendarTiles from '../CalendarTiles/CalendarTiles';
import { actualYear, isToday } from '../../helpers';
import { Training } from '../../Types/Training';

interface CalendarProps {
  isAuthorized: boolean;
  userEmail: string;
  todayTraining: Function;
  year: Function;
  refreshed: Function;
}

const Calendar = ({ isAuthorized, userEmail, todayTraining, year, refreshed }: CalendarProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trainings, setTrainings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(actualYear);

  const todayYear = () => {
    setCurrentYear(actualYear);
    year(actualYear);
  };
  const addYear = () => {
    setCurrentYear(currentYear + 1);
    year(currentYear + 1);
  };
  const subtractYear = () => {
    setCurrentYear(currentYear - 1);
    year(currentYear - 1);
  };

  useEffect(() => {
    if (isAuthorized === true) {
      const fetchTrainings = async () => {
        let response = await getUserTrainings();

        if (response?.data) {
          setTrainings(response.data);

          const todayTrainings = response.data.filter((training: Training) =>
            isToday(training.start_time.slice(0, 10))
          );

          todayTraining(todayTrainings[0] || null);

          setIsLoading(false);
          setIsRefreshing(false);
        }
      };

      fetchTrainings();
    }
  }, [isAuthorized, isRefreshing]);

  return (
    <div className="calendar">
      {isLoading || (isRefreshing && <Loader />)}
      {!isLoading && !isRefreshing && (
        <>
          <div className="calendar__switchYear">
            <button className="calendar__subtractYear" type="submit" onClick={subtractYear}>
              &#10148;
            </button>
            <button className="calendar__actualYear" type="submit" onClick={todayYear}>
              &#x2738;
            </button>
            <h2 className="calendar__year">{currentYear}</h2>
            <button className="calendar__addYear" type="submit" onClick={addYear}>
              &#10148;
            </button>
          </div>

          <div className="calendar__tilesContainer">
            {[...Array(12)].map((_, i) => (
              <CalendarTiles
                key={i}
                className={`month${i + 1}`}
                month={i + 1}
                userEmail={userEmail}
                year={currentYear}
                trainings={trainings}
                isRefreshing={(isRefreshing: boolean) => {
                  setIsRefreshing(isRefreshing);
                  refreshed(isRefreshing);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Calendar;
