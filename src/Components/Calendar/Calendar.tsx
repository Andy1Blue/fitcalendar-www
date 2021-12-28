import * as React from 'react';
import { useEffect, useState } from 'react';
import './Calendar.scss';
import { getUserTrainings } from '../../Services/TrainingsService';
import Loader from '../Loader/Loader';
import CalendarTiles from '../CalendarTiles/CalendarTiles';
import MonthView from '../MonthView/MonthView';
import { actualYear, isToday } from '../../helpers';
import { Training } from '../../Types/Training';
import * as dayjs from 'dayjs';

interface CalendarProps {
  isAuthorized: boolean;
  userEmail: string;
  todayTraining: Function;
  year: Function;
  refreshed: Function;
}

enum TypeView {
  Month = 'Month',
  Year = 'Year',
  Week = 'Week',
  Day = 'Day',
}

//TODO: refactor this component, need control from here whole calendar views
const Calendar = ({ isAuthorized, userEmail, todayTraining, year, refreshed }: CalendarProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trainings, setTrainings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(actualYear);
  const [typeView, setTypeView] = useState(TypeView.Year);

  const currentMonth = parseInt(dayjs().format('M'));

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
      {(isLoading || isRefreshing) && <Loader />}
      {!isLoading && !isRefreshing && (
        <>
          <div className="calendar__switchTypeView">
            <button className="switchTypeView__button" onClick={() => setTypeView(TypeView.Year)}>
              {TypeView.Year}
            </button>
            <button className="switchTypeView__button" onClick={() => setTypeView(TypeView.Month)}>
              {TypeView.Month}
            </button>
            {/* <button className="switchTypeView__button" onClick={() => setTypeView(TypeView.Week)}>
              {TypeView.Week}
            </button>
            <button className="switchTypeView__button" onClick={() => setTypeView(TypeView.Day)}>
              {TypeView.Day}
            </button> */}
          </div>

          {typeView === TypeView.Year && (
            <div className="calendar__header">
              <button className="calendar__subtractYear" type="submit" onClick={subtractYear}>
                &#10148;
              </button>
              <button className="calendar__actualYear" type="submit" onClick={todayYear}>
                &#x2738;
              </button>
              <h2 className="calendar__headerTitle">{currentYear}</h2>
              <button className="calendar__addYear" type="submit" onClick={addYear}>
                &#10148;
              </button>
            </div>
          )}

          <div className="calendar__tilesContainer">
            {typeView === TypeView.Year &&
              [...Array(12)].map((_, i) => (
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

            {typeView === TypeView.Month && (
              <>
                <MonthView
                  className={`month${currentMonth}`}
                  month={currentMonth}
                  userEmail={userEmail}
                  year={currentYear}
                  trainings={trainings}
                  isRefreshing={(isRefreshing: boolean) => {
                    setIsRefreshing(isRefreshing);
                    refreshed(isRefreshing);
                  }}
                />
              </>
            )}

            {typeView === TypeView.Day && (
              <>
                <MonthView
                  className={`month${currentMonth}`}
                  month={1}
                  userEmail={userEmail}
                  year={currentYear}
                  trainings={trainings}
                  isRefreshing={(isRefreshing: boolean) => {
                    setIsRefreshing(isRefreshing);
                    refreshed(isRefreshing);
                  }}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Calendar;
