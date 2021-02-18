import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import './CalendarTiles.scss';
import DayModal from '../DayModal/DayModal';
import { isToday } from '../../helpers';
import { Training } from '../../Types/Training';
import { ModalContext } from '../../Contexts/ModalContext';

interface CalendarTilesProps {
  className: string;
  userEmail: string;
  month: number;
  year: number;
  trainings: any;
  isRefreshing: (isRefreshing: boolean) => void;
}

const CalendarTiles = ({ className, userEmail, month, year, trainings, isRefreshing }: CalendarTilesProps) => {
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
  const [isDayModalVisible, setIsShowDayModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [dayModalTraining, setDayModalTraining] = useState(null);
  const [dayModalTrainingDate, setDayModalTrainingDate] = useState(null);

  const openDayModal = (training: Training | null, parsedDate?: string) => () => {
    setDayModalTraining(training);
    setDayModalTrainingDate(parsedDate);
    setIsShowDayModal(true);
  };

  const addTile = (day: number, month: number, year: number, training: Training | null, parsedDate: string) => {
    const innerDay = day >= 10 ? day : `0${day}`;
    const rectElement = document.createElement('div');
    rectElement.className = 'day';
    rectElement.innerHTML = innerDay.toString();

    rectElement.setAttribute('date', parsedDate);
    rectElement.setAttribute('description', parsedDate);

    if (isToday(parsedDate)) {
      rectElement.classList.add('today');
    }

    if (training?.start_time.slice(0, 10) === parsedDate) {
      rectElement.onclick = openDayModal(training, parsedDate);
      rectElement.classList.add('workout');
    }

    if (training?.start_time.slice(0, 10) !== parsedDate) {
      rectElement.onclick = openDayModal(null, parsedDate);
    }

    const monthElement = document.getElementById('FitCalendar').querySelector(`.month${month}`);
    monthElement.appendChild(rectElement);
  };

  const generateTiles = (monthTrainings: any) => {
    document.querySelector(`.month${month}`).innerHTML = '';

    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const innerDay = day >= 10 ? day : `0${day}`;
      const innerMonth = month >= 10 ? month : `0${month}`;
      const parsedDate = `${year}-${innerMonth}-${innerDay}`;

      const training = monthTrainings.filter((training: Training) => training.start_time.slice(0, 10) === parsedDate);
      addTile(day, month, year, training[0], parsedDate);
    }
  };

  useEffect(() => {
    const monthTrainings = trainings
      .map((training: Training) => training)
      .filter((training: Training) => parseInt(training.start_time.slice(5, 7)) === month);

    if (isPosting) {
      isRefreshing(true);
    }

    generateTiles(monthTrainings);
  }, [year, isDayModalVisible]);

  return (
    <div className="calendarTiles">
      <div className={className}></div>
      {isDayModalVisible && (
        <DayModal
          isDayModalVisible={(isVisible: boolean) => setIsShowDayModal(isVisible)}
          isPosted={(isPosted: boolean) => setIsPosting(isPosted)}
          training={dayModalTraining}
          trainingDate={dayModalTrainingDate}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};
export default CalendarTiles;
