import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './DayModal.scss';
import { Source, Sport, Training } from '../../Types/Training';
import { delayAction, hmsToSeconds, secondsToHms, todayDate } from '../../helpers';
import { addUserTraining, deleteUserTraining, PostBodyData } from '../../Services/TrainingsService';
import Spinner from '../Loader/Spinner';

interface DayModalProps {
  isDayModalVisible: any;
  isPosted: any;
  training: Training;
  trainingDate: string;
}

const DayModal = ({ isDayModalVisible, isPosted, training, trainingDate }: DayModalProps) => {
  const [loaded, setLoaded] = useState({ isLoading: false, loadingText: null });
  const [isTrainingDay, setIsTrainingDay] = useState(false);
  const [time, setTime] = useInput(secondsToHms(training?.duration_sec) || '01:00:00');
  const [sport, setSport] = useInput(training?.sport || Sport.Other);
  const [description, setDescription] = useInput(training?.description || '');
  const [distance, setDistance] = useInput(training?.distance_km || 0);
  const [calories, setCalories] = useInput(training?.calories_kcal || 0);

  const sportsInput: Sport[] = [Sport.Spinning, Sport.Run, Sport.Bike, Sport.Other];

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data: PostBodyData = {
      userEmail: 'purplecolorapps@gmail.com',
      sport: sport,
      tagColor: '#6e2364',
      source: Source.Manual,
      startTime: trainingDate,
      endTime: trainingDate,
      durationSec: hmsToSeconds(time),
      distanceKm: distance,
      caloriesKcal: calories,
      description: description,
      heartRateAvgBpm: null,
      heartRateMaxBpm: null,
      speedAvgKmh: null,
      speedMaxKmh: null,
      points: null,
    };

    if (data?.userEmail !== null) {
      const response = await addUserTraining(data);

      setLoaded({ isLoading: true, loadingText: 'Adding new training' });

      if (response?.status === 201) {
        delayAction(() => {
          setLoaded({ isLoading: false, loadingText: null });
          closeDayModal();
        });
      }
    }
  };

  const handleDelete = async (event: any) => {
    event.preventDefault();

    setLoaded({ isLoading: true, loadingText: 'Deleting training' });

    if (training?._id !== null) {
      const response = await deleteUserTraining(training._id);

      if (response?.status === 200) {
        delayAction(() => {
          setLoaded({ isLoading: false, loadingText: null });
          closeDayModal();
        });
      }
    }
  };

  const closeDayModal = () => {
    setIsTrainingDay(false);
    isPosted(true);
    isDayModalVisible(false);
  };

  const closeDayModalButton = () => {
    isDayModalVisible(false);
  };

  useEffect(() => {
    isPosted(false);

    if (training?.start_time.slice(0, 10) === trainingDate.slice(0, 10)) {
      setIsTrainingDay(true);
    }
  }, [training]);

  return (
    <div className="dayModal">
      <div className="dayModal__container">
        {!loaded.isLoading && (
          <button type="submit" className="dayModal__close" onClick={closeDayModalButton}>
            X
          </button>
        )}

        <div className="dayModal__content">
          <div className="dayModal__title">{trainingDate}</div>

          {loaded.isLoading && (
            <span className="dayModal__formInputContainer dayModal__formInputContainer--column dayModal__formInputContainer--center">
              <Spinner />
              {loaded.loadingText}
            </span>
          )}
          {!loaded.isLoading && (
            <>
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

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Distance (km)</span>
                    <input className="input__number" type="number" value={distance} onChange={setDistance} />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Calories (kcal)</span>
                    <input className="input__number" type="number" value={calories} onChange={setCalories} />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Max speed (kmh)</span>
                    <input className="input__number" type="number" value={distance} onChange={setDistance} />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Avg speed (kmh)</span>
                    <input className="input__number" type="number" value={calories} onChange={setCalories} />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Max heart rate (bpm)</span>
                    <input className="input__number" type="number" value={distance} onChange={setDistance} />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>&#128466; Avg heart rate (bpm)</span>
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
                        <button className="input__button" onClick={handleDelete}>
                          Delete training
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DayModal;
