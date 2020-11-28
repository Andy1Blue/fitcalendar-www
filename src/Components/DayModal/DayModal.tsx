import * as React from 'react';
import { useEffect } from 'react';
import './DayModal.scss';

interface DayModalProps {
  isDayModalVisible: any;
  training: any;
}

const DayModal = ({ isDayModalVisible, training }: DayModalProps) => {
  const closeDayModal = () => {
    isDayModalVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="dayModal">
      <div className="dayModal__container">
        <button type="submit" className="dayModal__close" onClick={closeDayModal}>
          X
        </button>

        <div className="dayModal__content">
          <div className="dayModal__title">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
          <div className="dayModal__stat">{training.createdDate.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
};
export default DayModal;
