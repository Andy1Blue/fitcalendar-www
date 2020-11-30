import * as React from 'react';
import { useEffect, useState } from 'react';
import './TodayCard.scss';
import { todayDate } from '../../helpers';
import { Training } from '../../Types/Training';

interface TodayCardProps {
  training: Training;
}

const TodayCard = ({ training }: TodayCardProps) => {
  const [dayModalTraining, setDayModalTraining] = useState(null);
  const [isTodayWorkout, setIsTodayWorkout] = useState(false);

  useEffect(() => {
    setIsTodayWorkout(training?.start_time !== null);
  }, []);

  return (
    <div className="todayCard">
      <div className="todayCard__date">
        <span>
          Today is &#128467; <b>{todayDate().slice(0,10)}</b>
        </span>
      </div>
      {!isTodayWorkout && <div className="todayCard__addWorkoutButton">Add workout</div>}
      {isTodayWorkout && (
        <div>
          <span>&#128170; Your training: {training?.sport}</span>
          <span>&#128336; {training?.duration_sec/60} min</span>
          <span>&#128099; {training?.distance_km} km</span>
          <span>&#128293; {training?.calories_kcal} kcal</span>
        </div>
      )}
    </div>
  );
};
export default TodayCard;
