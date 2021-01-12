import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '../../Hooks/useInput';
import './ListTrainingsModal.scss';
import { Source, Sport, Training } from '../../Types/Training';
import { sportsInput, sportIconMapping } from '../../SportsConfig/Input';
import { delayAction, hmsToSeconds, secondsToHms } from '../../helpers';
import { addUserTraining, updateUserTraining, deleteUserTraining, PostBodyData } from '../../Services/TrainingsService';
import Spinner from '../Loader/Spinner';

interface ListTrainingsModalProps {
  trainings: Training[];
}

const ListTrainingsModal = ({ trainings }: ListTrainingsModalProps) => {
  // const [loaded, setLoaded] = useState({ isLoading: false, loadingText: null });
  // const [isTrainingDay, setIsTrainingDay] = useState(false);
  // const [time, setTime] = useInput(secondsToHms(training[0]?.duration_sec) || '01:00:00');
  // const [sport, setSport] = useInput(training[0]?.sport || Sport.Other);
  // const [description, setDescription] = useInput(training[0]?.description || '');
  // const [distance, setDistance] = useInput(training[0]?.distance_km || 0);
  // const [calories, setCalories] = useInput(training[0]?.calories_kcal || 0);
  // const [maxSpeed, setMaxSpeed] = useInput(training[0]?.speed_max_kmh || 0);
  // const [avgSpeed, setAvgSpeed] = useInput(training[0]?.speed_avg_kmh || 0);
  // const [maxHeartRate, setMaxHeartRate] = useInput(training[0]?.heart_rate_max_bpm || 0);
  // const [avgHeartRate, setAvgHeartRate] = useInput(training[0]?.heart_rate_avg_bpm || 0);

  // const closeDayModal = () => {
  //   setIsTrainingDay(false);
  //   isPosted(true);
  //   isDayModalVisible(false);
  // };

  // const closeDayModalButton = () => {
  //   isDayModalVisible(false);
  // };

  useEffect(() => {
    // isPosted(false);
    // console.log(training);
    // if (training[0]?.start_time.slice(0, 10) === trainingDate.slice(0, 10)) {
    //   setIsTrainingDay(true);
    // }
  }, [trainings]);

  return (
    <div>
      {trainings.map((training: Training, index: number) => (
        <p key={index}>{training.description}</p>
      ))}
    </div>
  );
};
export default ListTrainingsModal;
