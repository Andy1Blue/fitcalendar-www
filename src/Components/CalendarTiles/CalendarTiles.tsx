import * as React from 'react';
import { useEffect, useState } from 'react';
import './CalendarTiles.scss';
import DayModal from '../DayModal/DayModal';
import { isToday } from '../../helpers';

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
  const [dayModalTrainingDate, setDayModalTrainingDate] = useState(null);

  const openDayModal = (training: any | null, parsedDate?: string) => (event: any) => {
    setDayModalTraining(training);
    setDayModalTrainingDate(parsedDate);
    setIsShowDayModal(true);
  };

  const addTile = (day: number, month: number, year: number, training: any | null, parsedDate: string) => {
    const innerDay = day >= 10 ? day : `0${day}`;
    const rectElement = document.createElement('div');
    rectElement.className = 'day';
    rectElement.innerHTML = innerDay.toString();

    rectElement.setAttribute('date', parsedDate);
    rectElement.setAttribute('description', parsedDate);

    if (isToday(parsedDate)) {
      rectElement.classList.add('today');
    }

    if (training?.createdDate.slice(0, 10) === parsedDate) {
      rectElement.onclick = openDayModal(training, parsedDate);
      rectElement.classList.add('workout');
    }

    if (training?.createdDate.slice(0, 10) !== parsedDate) {
      rectElement.onclick = openDayModal(null, parsedDate);
    }

    const monthElement = document.getElementById('root').querySelector(`.month${month}`);
    monthElement.appendChild(rectElement);
  };

  const generateTiles = (monthTrainings: any) => {
    document.querySelector(`.month${month}`).innerHTML = '';

    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const innerDay = day >= 10 ? day : `0${day}`;
      const innerMonth = month >= 10 ? month : `0${month}`;
      const parsedDate = `${year}-${innerMonth}-${innerDay}`;

      const training = monthTrainings.filter((training: any) => training.createdDate.slice(0, 10) === parsedDate);
      addTile(day, month, year, training[0], parsedDate);
    }
  };

  useEffect(() => {
    const monthTrainings = trainings
      .map((training: any) => training)
      .filter((training: any) => training.createdDate.slice(5, 7) == month);

    generateTiles(monthTrainings);
  }, [year]);

  return (
    <div className="calendarTiles">
      <div className={className}></div>
      {isDayModalVisible && (
        <DayModal
          isDayModalVisible={(isVisible: boolean) => setIsShowDayModal(isVisible)}
          training={dayModalTraining}
          trainingDate={dayModalTrainingDate}
        />
      )}
    </div>
  );
};
export default CalendarTiles;
