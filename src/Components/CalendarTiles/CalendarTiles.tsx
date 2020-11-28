import * as React from 'react';
import { useEffect } from 'react';
import './CalendarTiles.scss';

interface CalendarTilesProps {
  className: string;
  month: number;
  year: number;
  trainings: any;
}

const CalendarTiles = ({ className, month, year, trainings }: CalendarTilesProps) => {
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

  const isToday = (parsedDate: string) => {
    const today = new Date();
    let day: string | number = today.getDate();
    day = day >= 10 ? day : `0${day}`;

    let month: string | number = today.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;

    let year: number = today.getFullYear();

    return parsedDate === `${year}-${month}-${day}`;
  };

  const addTile = (day: number, month: number, year: number) => {
    const rectElement = document.createElement('rect');
    rectElement.className = 'day';

    const innerDay = day >= 10 ? day : `0${day}`;
    const innerMonth = month >= 10 ? month : `0${month}`;
    rectElement.innerHTML = innerDay.toString();

    const parsedDate = `${year}-${innerMonth}-${innerDay}`;

    rectElement.setAttribute('date', parsedDate);
    rectElement.setAttribute('description', parsedDate);

    if (isToday(parsedDate)) {
      rectElement.classList.add('today');
    }

    for (const key in trainings) {
      const training = trainings[key];
      if (training.createdDate.slice(0, 10) === parsedDate) {
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
    </div>
  );
};
export default CalendarTiles;
