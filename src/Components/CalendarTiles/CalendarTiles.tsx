import * as React from 'react';
import { useEffect, useState } from 'react';
import './CalendarTiles.scss';
import DayModal from '../DayModal/DayModal';

interface CalendarTilesProps {
  className: string;
  month: number;
  year: number;
  trainings: any;
}

const CalendarTiles = ({ className, month, year, trainings }: CalendarTilesProps) => {
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
  const [isDayModalVisible, setIsShowDayModal] = useState(false);
  const [dayModalTraining, setDayModalTraining] = useState(null);

  const isToday = (parsedDate: string) => {
    const today = new Date();
    let day: string | number = today.getDate();
    day = day >= 10 ? day : `0${day}`;

    let month: string | number = today.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;

    let year: number = today.getFullYear();

    return parsedDate === `${year}-${month}-${day}`;
  };

  const openDayModal = (training: any) => (event: any) => {
    setDayModalTraining(training);
    setIsShowDayModal(true);
  };

  const addTile = (day: number, month: number, year: number) => {
    const innerDay = day >= 10 ? day : `0${day}`;
    const innerMonth = month >= 10 ? month : `0${month}`;
    const parsedDate = `${year}-${innerMonth}-${innerDay}`;

    const rectElement = document.createElement('div');
    rectElement.className = 'day';
    rectElement.innerHTML = innerDay.toString();

    rectElement.setAttribute('date', parsedDate);
    rectElement.setAttribute('description', parsedDate);

    if (isToday(parsedDate)) {
      rectElement.classList.add('today');
    }

    for (const i in trainings) {
      const training = trainings[i];

      if (training.createdDate.slice(0, 10) === parsedDate) {
        console.log(training);
        rectElement.onclick = openDayModal(training);
        rectElement.classList.add('workout');
      }
    }

    const monthElement = document.getElementById('root').querySelector(`.month${month}`);
    monthElement.appendChild(rectElement);
  };

  const generateTiles = () => {
    if (true) {
      document.querySelector(`.month${month}`).innerHTML = '';
      for (let day = 1; day <= daysInMonth(month, year); day++) {
        addTile(day, month, year);
      }
    }
  };

  useEffect(() => {
    generateTiles();
  }, [year]);

  return (
    <div className="calendarTiles">
      <div className={className}></div>
      {isDayModalVisible && <DayModal isDayModalVisible={(isVisible:boolean) => setIsShowDayModal(isVisible)} training={dayModalTraining} />}
    </div>
  );
};
export default CalendarTiles;
