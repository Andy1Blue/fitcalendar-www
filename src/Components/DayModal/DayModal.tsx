import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './DayModal.scss';
import { Sport, Training } from '../../Types/Training';
import { secondsToHms, todayDate } from '../../helpers';

interface DayModalProps {
  isDayModalVisible: any;
  training: Training;
  trainingDate: string;
}

const DayModal = ({ isDayModalVisible, training, trainingDate }: DayModalProps) => {
  const [isTrainingDay, setIsTrainingDay] = useState(false);
  const [time, setTime] = useInput(secondsToHms(training?.duration_sec) || '01:00:00');
  const [sport, setSport] = useInput(training?.sport || Sport.Other);
  const [description, setDescription] = useInput(training?.description || '');
  const [distance, setDistance] = useInput(training?.distance_km || 0);
  const [calories, setCalories] = useInput(training?.calories_kcal || 0);

  const sportsInput: Sport[] = [Sport.Spinning, Sport.Run, Sport.Bike, Sport.Other];

  const handleSubmit = (event: any) => {
    event.preventDefault();
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

          <div className="dayModal__form">
            <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
              <span>&#128466; Time (hh:mm:ss)</span>
              <input className="input__time" type="time" step="2" value={time} onChange={setTime} />
            </div>

            <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
              <span>&#128466; Sport</span>
              <select className="input__select" value={sport} onChange={setSport} name="sports" id="sports">
                {sportsInput.map((sport: Sport, index: number) => (
                  <option key={index} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <div className="dayModal__formInputContainer dayModal__formInputContainer--row">
              <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                <span>&#128466; Distance (km)</span>
                <input className="input__number" type="number" value={distance} onChange={setDistance} />
              </div>

              <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                <span>&#128466; Calories (kcal)</span>
                <input className="input__number" type="number" value={calories} onChange={setCalories} />
              </div>
            </div>

            <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
              <span>&#128466; Description</span>
              <input
                className="input__text"
                type="text"
                placeholder="Describe your training..."
                value={description}
                onChange={setDescription}
              />
            </div>

            <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
              <div className="dayModal__formInputContainer dayModal__formInputContainer--row">
                {!isTrainingDay && (
                  <button className="input__button" onClick={handleSubmit}>
                    Add training
                  </button>
                )}
                {isTrainingDay && (
                  <>
                    <button className="input__button" onClick={handleSubmit}>
                      Edit training
                    </button>
                    <button className="input__button" onClick={handleSubmit}>
                      Delete training
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DayModal;
