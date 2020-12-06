import * as React from 'react';
import { useEffect, useState } from 'react';
import './TodayCard.scss';
import { todayDate } from '../../helpers';
import { Training } from '../../Types/Training';
import { sportIconMapping } from '../../SportsConfig/Input';

interface TodayCardProps {
  training: Training;
}

const TodayCard = ({ training }: TodayCardProps) => {
  const [dayModalTraining, setDayModalTraining] = useState(null);
  const [isTodayWorkout, setIsTodayWorkout] = useState(false);

  const detailsToShow = [
    {
      value: training?.duration_sec / 60,
      icon: '🕐',
      unit: 'min',
    },
    {
      value: training?.distance_km,
      icon: '👣',
      unit: 'km',
    },
    {
      value: training?.calories_kcal,
      icon: '🔥',
      unit: 'kcal',
    },
    {
      value: training?.speed_avg_kmh,
      icon: '🚀',
      unit: 'kmh',
    },
    {
      value: training?.heart_rate_avg_bpm,
      icon: '💓',
      unit: 'bpm',
    },
  ];

  useEffect(() => {
    setIsTodayWorkout(training !== null);
  }, [training]);

  return (
    <div className="todayCard">
      <div className="todayCard__date">
        <span>
          Today is &#128467; <b>{todayDate().slice(0, 10)}</b>
        </span>
      </div>
      {!isTodayWorkout && (
        <div className="todayCard__content">
          No training today!
          {/* TODO: add button to adding workout from this place
          <br /><button className="todayCard__addWorkoutButton">Add workout</button> */}
        </div>
      )}
      {isTodayWorkout && (
        <div className="todayCard__content">
          <span>
            Your training: {sportIconMapping[training?.sport]} {training?.sport}
          </span>
          <hr className="todayCard__hr" />
          <div className="todayCard__contentDetails">
            {detailsToShow.map((detail, index) =>
              detail.value !== null ? (
                <span key={index}>
                  <span className="icon">{detail.icon}</span> {detail.value} {detail.unit}
                </span>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TodayCard;
