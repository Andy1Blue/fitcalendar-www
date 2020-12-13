import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './DayModal.scss';
import { Source, Sport, Training } from '../../Types/Training';
import { sportsInput, sportIconMapping } from '../../SportsConfig/Input';
import { delayAction, hmsToSeconds, secondsToHms } from '../../helpers';
import { addUserTraining, updateUserTraining, deleteUserTraining, PostBodyData } from '../../Services/TrainingsService';
import Spinner from '../Loader/Spinner';

interface DayModalProps {
  userEmail: string;
  isDayModalVisible: any;
  isPosted: any;
  training: Training;
  trainingDate: string;
}

const DayModal = ({ userEmail, isDayModalVisible, isPosted, training, trainingDate }: DayModalProps) => {
  const [loaded, setLoaded] = useState({ isLoading: false, loadingText: null });
  const [isTrainingDay, setIsTrainingDay] = useState(false);
  const [time, setTime] = useInput(secondsToHms(training?.duration_sec) || '01:00:00');
  const [sport, setSport] = useInput(training?.sport || Sport.Other);
  const [description, setDescription] = useInput(training?.description || '');
  const [distance, setDistance] = useInput(training?.distance_km || 0);
  const [calories, setCalories] = useInput(training?.calories_kcal || 0);
  const [maxSpeed, setMaxSpeed] = useInput(training?.speed_max_kmh || 0);
  const [avgSpeed, setAvgSpeed] = useInput(training?.speed_avg_kmh || 0);
  const [maxHeartRate, setMaxHeartRate] = useInput(training?.heart_rate_max_bpm || 0);
  const [avgHeartRate, setAvgHeartRate] = useInput(training?.heart_rate_avg_bpm || 0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data: PostBodyData = {
      userEmail,
      sport,
      tagColor: '#6e2364',
      source: Source.Manual,
      startTime: trainingDate,
      endTime: trainingDate,
      durationSec: hmsToSeconds(time),
      distanceKm: distance,
      caloriesKcal: calories,
      description: description,
      heartRateAvgBpm: avgHeartRate,
      heartRateMaxBpm: maxHeartRate,
      speedAvgKmh: avgSpeed,
      speedMaxKmh: maxSpeed,
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
      } else {
        setLoaded({ isLoading: false, loadingText: null });
        closeDayModal();
        alert('Error, try again!');
      }
    }
  };

  const updateSubmit = async (event: any) => {
    event.preventDefault();

    const data: PostBodyData = {
      userEmail,
      sport,
      tagColor: '#6e2364',
      source: Source.Manual,
      startTime: trainingDate,
      endTime: trainingDate,
      durationSec: hmsToSeconds(time),
      distanceKm: distance,
      caloriesKcal: calories,
      description: description,
      heartRateAvgBpm: avgHeartRate,
      heartRateMaxBpm: maxHeartRate,
      speedAvgKmh: avgSpeed,
      speedMaxKmh: maxSpeed,
      points: null,
    };

    if (data?.userEmail !== null) {
      const response = await updateUserTraining(training._id, data);

      setLoaded({ isLoading: true, loadingText: 'Updating training' });

      if (response?.status === 200) {
        delayAction(() => {
          setLoaded({ isLoading: false, loadingText: null });
          closeDayModal();
        });
      } else {
        setLoaded({ isLoading: false, loadingText: null });
        closeDayModal();
        alert('Error, try again!');
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
      } else {
        setLoaded({ isLoading: false, loadingText: null });
        closeDayModal();
        alert('Error, try again!');
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
                  <span>
                    <span className="icon">&#128336;</span> Duration (hh:mm:ss)
                  </span>
                  <input className="input__time" type="time" step="2" value={time} onChange={setTime} />
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                  <span>
                    <span className="icon">&#127941;</span> Sport
                  </span>
                  <select className="input__select" value={sport} onChange={setSport} name="sports" id="sports">
                    {sportsInput.map((sport: Sport, index: number) => (
                      <option key={index} value={sport}>
                        {sportIconMapping[sport]} {sport}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128099;</span> Distance (km)
                    </span>
                    <input className="input__number" min="0" type="number" value={distance} onChange={setDistance} />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128293;</span> Calories (kcal)
                    </span>
                    <input className="input__number" min="0" type="number" value={calories} onChange={setCalories} />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128640;</span> Max speed (kmh)
                    </span>
                    <input className="input__number" min="0" type="number" value={maxSpeed} onChange={setMaxSpeed} />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128640;</span> Avg speed (kmh)
                    </span>
                    <input className="input__number" min="0" type="number" value={avgSpeed} onChange={setAvgSpeed} />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128147;</span> Max heart rate (bpm)
                    </span>
                    <input
                      className="input__number"
                      min="0"
                      type="number"
                      value={maxHeartRate}
                      onChange={setMaxHeartRate}
                    />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128147;</span> Avg heart rate (bpm)
                    </span>
                    <input
                      className="input__number"
                      min="0"
                      type="number"
                      value={avgHeartRate}
                      onChange={setAvgHeartRate}
                    />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                  <span>
                    <span className="icon">&#128466;</span> Description
                  </span>
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
                        <button className="input__button input__button--delete" onClick={handleDelete}>
                          Delete training
                        </button>
                        <button className="input__button" onClick={updateSubmit}>
                          Update training
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
