import * as React from 'react';
import { useEffect, useState } from 'react';
import './DayModal.scss';

interface DayModalProps {
  isDayModalVisible: any;
  training: any;
  trainingDate: string;
}

const DayModal = ({ isDayModalVisible, training, trainingDate }: DayModalProps) => {
  const [isTrainingDay, setIsTrainingDay] = useState(false);

  const closeDayModal = () => {
    setIsTrainingDay(false);
    isDayModalVisible(false);
  };

  useEffect(() => {
    if (training?.createdDate.slice(0, 10) === trainingDate) {
      setIsTrainingDay(true);
    }
  }, [training]);

  return (
    <div className="dayModal">
      <div className="dayModal__container">
        <button type="submit" className="dayModal__close" onClick={closeDayModal}>
          X
        </button>

        <div className="dayModal__content">
          <div className="dayModal__title">{trainingDate}</div>
          {isTrainingDay && (
            <>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
              <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DayModal;
