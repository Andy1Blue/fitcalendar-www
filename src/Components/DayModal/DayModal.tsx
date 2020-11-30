import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './DayModal.scss';
import { Sport, Training } from '../../Types/Training';
import { todayDate } from '../../helpers';

interface DayModalProps {
  isDayModalVisible: any;
  training: Training;
  trainingDate: string;
}

const sportsInput: Sport[] = [Sport.Spinning, Sport.Run, Sport.Bike, Sport.Other];

const DayModal = ({ isDayModalVisible, training, trainingDate }: DayModalProps) => {
  const [isTrainingDay, setIsTrainingDay] = useState(false);
  const { value: time, bind: bindTime } = useInput('01:00:00');
  const { value: sport, bind: bindSport} = useInput('Other');
  const { value:description, bind:bindDescription } = useInput('fdsfs');
  const { value: distance, bind: bindDistance } = useInput(0);
  const { value: calories, bind: bindCalories } = useInput(0);
  
  const handleSubmit = (event: any) => {
    event.preventDefault();

    alert(`Submitting Name ${time} ${sport} ${description} ${distance} ${calories}`);

  };

  const closeDayModal = () => {
    setIsTrainingDay(false);
    isDayModalVisible(false);
  };

  useEffect(() => {
    if (training?.start_time.slice(0, 10) === trainingDate.slice(0, 10)) {
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
            <form onSubmit={handleSubmit}>
        

              <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                <span>&#128466; Description</span>
                <input
                  type="text"
                  { ...bindDescription }
                />
              </div>


              <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                <input type="submit">Add training</input>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default DayModal;
