import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './DayModal.scss';
import { Source, Sport, Training } from '../../Types/Training';
import { sportsInput, sportIconMapping, statisticIconMapping } from '../../SportsConfig/Input';
import { delayAction, hmsToSeconds, secondsToHms } from '../../helpers';
import { addUserTraining, updateUserTraining, deleteUserTraining, PostBodyData } from '../../Services/TrainingsService';
import Spinner from '../Loader/Spinner';
import { Statistic } from '../../Types/Statistic';

interface DayModalProps {
  userEmail: string;
  isDayModalVisible: Function;
  isPosted: Function;
  training: Training;
  trainingDate: string;
}

const DayModal = ({ userEmail, isDayModalVisible, isPosted, training, trainingDate }: DayModalProps) => {
  const [loaded, setLoaded] = useState({ isLoading: false, loadingText: null });
  const [isTrainingDay, setIsTrainingDay] = useState(false);
  const [isAdditionalInputs, setIsAdditionalInputs] = useState(false);
  const [time, setTime] = useInput(secondsToHms(training?.duration_sec) || '00:00:00');
  const [timeMove, setTimeMove] = useInput(secondsToHms(training?.duration_move_sec) || '00:00:00');
  const [sport, setSport] = useState(training?.sport || Sport.Other);
  const [description, setDescription] = useInput(training?.description || '');
  const [distance, setDistance] = useInput(training?.distance_km || 0);
  const [calories, setCalories] = useInput(training?.calories_kcal || 0);
  const [maxSpeed, setMaxSpeed] = useInput(training?.speed_max_kmh || 0);
  const [avgSpeed, setAvgSpeed] = useInput(training?.speed_avg_kmh || 0);
  const [maxHeartRate, setMaxHeartRate] = useInput(training?.heart_rate_max_bpm || 0);
  const [avgHeartRate, setAvgHeartRate] = useInput(training?.heart_rate_avg_bpm || 0);
  const [effort, setEffort] = useInput(training?.effort || 0);
  const [feeling, setFeeling] = useInput(training?.feeling || 0);
  const [steps, setSteps] = useInput(training?.steps || 0);
  const [hydration, setHydration] = useInput(training?.hydration_ml || 0);
  const [elevationMaxM, setElevationMaxM] = useInput(training?.elevation_max_m || 0);
  const [elevationMinM, setElevationMinM] = useInput(training?.elevation_min_m || 0);
  const [elevationGainM, setElevationGainM] = useInput(training?.elevation_gain_m || 0);
  const [trainingEffectAerobic, setTrainingEffectAerobic] = useInput(training?.training_effect_aerobic || 0);
  const [trainingEffectAnaerobic, setTrainingEffectAnaerobic] = useInput(training?.training_effect_anaerobic || 0);
  const [vo2max, setVo2max] = useInput(training?.vo2max || 0);
  const [paceMaxMinKm, setPaceMaxMinKm] = useInput(training?.pace_max_min_km || 0);
  const [paceAvgMinKm, setPaceAvgMinKm] = useInput(training?.pace_avg_min_km || 0);
  const [cadenceMaxSpm, setCadenceMaxSpm] = useInput(training?.cadence_max_spm || 0);
  const [cadenceAvgSpm, setCadenceAvgSpm] = useInput(training?.cadence_avg_spm || 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data: PostBodyData = {
      userEmail,
      sport,
      tagColor: '#6e2364',
      source: Source.Manual,
      startTime: trainingDate,
      endTime: trainingDate,
      durationSec: hmsToSeconds(time),
      durationMoveSec: hmsToSeconds(timeMove),
      distanceKm: distance,
      caloriesKcal: calories,
      description: description,
      heartRateAvgBpm: avgHeartRate,
      heartRateMaxBpm: maxHeartRate,
      speedAvgKmh: avgSpeed,
      speedMaxKmh: maxSpeed,
      points: null,
      effort,
      feeling,
      steps,
      hydrationMl: hydration,
      elevationMaxM,
      elevationMinM,
      elevationGainM,
      trainingEffectAerobic,
      trainingEffectAnaerobic,
      vo2max,
      paceMaxMinKm,
      paceAvgMinKm,
      cadenceMaxSpm,
      cadenceAvgSpm,
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

  const updateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let isConfirmed = confirm('Are you sure?');

    if (isConfirmed) {
      const data: PostBodyData = {
        userEmail,
        sport,
        tagColor: '#6e2364',
        source: Source.Manual,
        startTime: trainingDate,
        endTime: trainingDate,
        durationSec: hmsToSeconds(time),
        durationMoveSec: hmsToSeconds(timeMove),
        distanceKm: distance,
        caloriesKcal: calories,
        description: description,
        heartRateAvgBpm: avgHeartRate,
        heartRateMaxBpm: maxHeartRate,
        speedAvgKmh: avgSpeed,
        speedMaxKmh: maxSpeed,
        points: null,
        effort,
        feeling,
        steps,
        hydrationMl: hydration,
        elevationMaxM,
        elevationMinM,
        elevationGainM,
        trainingEffectAerobic,
        trainingEffectAnaerobic,
        vo2max,
        paceMaxMinKm,
        paceAvgMinKm,
        cadenceMaxSpm,
        cadenceAvgSpm,
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
    }
  };

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();

    let isConfirmed = confirm('Are you sure?');

    if (isConfirmed) {
      setLoaded({ isLoading: true, loadingText: 'Deleting training' });

      if (training?._id !== null) {
        const response = await deleteUserTraining(training._id, userEmail);

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

  function toggleList() {
    // TODO: use ref
    document.getElementById('div__dropdownSport').classList.toggle('show__dropdownSportContent');
  }

  function toggleAdditional() {
    setIsAdditionalInputs(!isAdditionalInputs);
  }

  const filterFunction = (inputValue: string) => {
    // TODO: use ref
    const dropdownSport = document.getElementById('div__dropdownSport');
    const dropdownSportItems = dropdownSport.getElementsByTagName('a');
    for (let i = 0; i < dropdownSportItems.length; i++) {
      const txtValue = dropdownSportItems[i].textContent || dropdownSportItems[i].innerText;
      if (txtValue.toUpperCase().indexOf(inputValue.toUpperCase()) > -1) {
        dropdownSportItems[i].style.display = '';
      } else {
        dropdownSportItems[i].style.display = 'none';
      }
    }
  };

  const handleClick = (event: any, set: any) => {
    event.preventDefault();

    if (event?.target?.value == 0) {
      set('');
    }
  };

  const handleBlur = (event: any, set: any) => {
    event.preventDefault();

    if (event?.target?.value == '') {
      set(0);
    }
  };

  const handleChange = (event?: any) => {
    event.preventDefault();
    const value = event?.target?.value.replace(',', '.');

    setDistance(value);
  };

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
                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128336;</span> Duration (hh:mm:ss)
                    </span>
                    <input
                      className="input__time"
                      type="time"
                      step="1"
                      pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      value={time}
                      onChange={setTime}
                    />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128336;</span> Duration - move (hh:mm:ss)
                    </span>
                    <input
                      className="input__time"
                      type="time"
                      step="1"
                      pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      value={timeMove}
                      onChange={setTimeMove}
                    />
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                  <span>
                    <span className="icon">&#127941;</span> Sport
                  </span>

                  <div className="input__dropdownSportContainer">
                    <input
                      type="text"
                      placeholder="Search.."
                      id="input__dropdownSport"
                      onChange={(event: any) => {
                        // TODO: change any
                        filterFunction(event.target.value);
                        setSport(event.target.value);
                      }}
                      onFocus={toggleList}
                      value={sport}
                    />
                    <div id="div__dropdownSport" className="input__dropdownSportContent">
                      {sportsInput.map((sport: Sport, index: number) => (
                        <a
                          key={index}
                          onClick={() => {
                            setSport(sport);
                            // TODO: change any
                            // TODO: use ref
                            const dropdownSportInput: any = document.getElementById('input__dropdownSport');
                            dropdownSportInput.value = `${sportIconMapping[sport]} ${sport}`;
                            toggleList();
                          }}
                        >
                          {sportIconMapping[sport]} {sport}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">{statisticIconMapping[Statistic.Distance]}</span> {Statistic.Distance} (km)
                    </span>
                    <input
                      className="input__number"
                      type="number"
                      value={distance}
                      onChange={(event) => handleChange(event)}
                      onClick={(event) => handleClick(event, setDistance)}
                      onBlur={(event) => handleBlur(event, setDistance)}
                    />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">{statisticIconMapping[Statistic.Calories]}</span> {Statistic.Calories}{' '}
                      (kcal)
                    </span>
                    <input
                      className="input__number"
                      min="0"
                      type="number"
                      value={calories}
                      onChange={(event) => handleChange(event)}
                      onClick={(event) => handleClick(event, setCalories)}
                      onBlur={(event) => handleBlur(event, setCalories)}
                    />
                  </div>
                </div>

                <div className="dayModal__additional">
                  <span className="dayModal__additionalText" onClick={toggleAdditional}>
                    {isAdditionalInputs ? 'Hide' : 'Show'} additional inputs
                  </span>
                </div>

                <div
                  className={`dayModal__additional ${
                    isAdditionalInputs ? 'dayModal__additional--show' : 'dayModal__additional--hide'
                  }`}
                >
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">{statisticIconMapping[Statistic.SpeedMax]}</span> {Statistic.SpeedMax}{' '}
                        (kmh)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={maxSpeed}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setMaxSpeed)}
                        onBlur={(event) => handleBlur(event, setMaxSpeed)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">{statisticIconMapping[Statistic.SpeedAvg]}</span> {Statistic.SpeedAvg}{' '}
                        (kmh)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={avgSpeed}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setAvgSpeed)}
                        onBlur={(event) => handleBlur(event, setAvgSpeed)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#9201;</span> Max pace (min/km)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={paceMaxMinKm}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setPaceMaxMinKm)}
                        onBlur={(event) => handleBlur(event, setPaceMaxMinKm)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#9201;</span> Avg pace (min/km)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={paceAvgMinKm}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setPaceAvgMinKm)}
                        onBlur={(event) => handleBlur(event, setPaceAvgMinKm)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#127939;</span> Max cadence (spm)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={cadenceMaxSpm}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setCadenceMaxSpm)}
                        onBlur={(event) => handleBlur(event, setCadenceMaxSpm)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#127939;</span> Avg cadence (spm)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={cadenceAvgSpm}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setCadenceAvgSpm)}
                        onBlur={(event) => handleBlur(event, setCadenceAvgSpm)}
                      />
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
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setMaxHeartRate)}
                        onBlur={(event) => handleBlur(event, setMaxHeartRate)}
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
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setAvgHeartRate)}
                        onBlur={(event) => handleBlur(event, setAvgHeartRate)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#128099;</span> Steps
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={steps}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setSteps)}
                        onBlur={(event) => handleBlur(event, setSteps)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#128167;</span> Hydration (ml)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={hydration}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setHydration)}
                        onBlur={(event) => handleBlur(event, setHydration)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#128314;</span> Max elevation (m)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={elevationMaxM}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setElevationMaxM)}
                        onBlur={(event) => handleBlur(event, setElevationMaxM)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#128315;</span> Min elevation (m)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={elevationMinM}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setElevationMinM)}
                        onBlur={(event) => handleBlur(event, setElevationMinM)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#127956;</span> Elevation gain (m)
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={elevationGainM}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setElevationGainM)}
                        onBlur={(event) => handleBlur(event, setElevationGainM)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#127919;</span> Training Effect - aerobic
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={trainingEffectAerobic}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setTrainingEffectAerobic)}
                        onBlur={(event) => handleBlur(event, setTrainingEffectAerobic)}
                      />
                    </div>

                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#127919;</span> Training Effect - anaerobic
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={trainingEffectAnaerobic}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setTrainingEffectAnaerobic)}
                        onBlur={(event) => handleBlur(event, setTrainingEffectAnaerobic)}
                      />
                    </div>
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                    <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                      <span>
                        <span className="icon">&#128200;</span> VO<small>2</small>MAX
                      </span>
                      <input
                        className="input__number"
                        min="0"
                        type="number"
                        value={vo2max}
                        onChange={(event) => handleChange(event)}
                        onClick={(event) => handleClick(event, setVo2max)}
                        onBlur={(event) => handleBlur(event, setVo2max)}
                      />
                    </div>
                  </div>
                </div>

                <div className="dayModal__formInputContainer dayModal__formInputContainer--row dayModal__formInputContainer--center">
                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#127773;</span> Feeling (0 - bad, 10 - good)
                    </span>
                    <input
                      className="input__number"
                      min="0"
                      max="10"
                      type="number"
                      value={feeling}
                      onChange={(event) => handleChange(event)}
                      onClick={(event) => handleClick(event, setFeeling)}
                      onBlur={(event) => handleBlur(event, setFeeling)}
                    />
                  </div>

                  <div className="dayModal__formInputContainer dayModal__formInputContainer--column">
                    <span>
                      <span className="icon">&#128170;</span> Effort (0 - low, 10 - high)
                    </span>
                    <input
                      className="input__number"
                      min="0"
                      max="10"
                      type="number"
                      value={effort}
                      onChange={(event) => handleChange(event)}
                      onClick={(event) => handleClick(event, setEffort)}
                      onBlur={(event) => handleBlur(event, setEffort)}
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
