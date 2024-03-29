import * as React from 'react';
import { useEffect, useState } from 'react';
import './TodayCard.scss';
import { secondsToHms, todayDate } from '../../helpers';
import { Training } from '../../Types/Training';
import { sportIconMapping, statisticIconMapping } from '../../SportsConfig/Input';
import { Statistic } from '../../Types/Statistic';

interface TodayCardProps {
  training: Training;
}

const TodayCard = ({ training }: TodayCardProps) => {
  const [dayModalTraining, setDayModalTraining] = useState(null);
  const [isTodayWorkout, setIsTodayWorkout] = useState(false);

  useEffect(() => {
    setIsTodayWorkout(training !== null);
  }, [training]);

  const detailsToShow = [
    {
      value: secondsToHms(training?.duration_sec),
      icon: statisticIconMapping[Statistic.Duration],
      unit: 'min',
    },
    {
      value: training?.distance_km,
      icon: statisticIconMapping[Statistic.Distance],
      unit: 'km',
    },
    {
      value: training?.calories_kcal,
      icon: statisticIconMapping[Statistic.Trainings],
      unit: 'kcal',
    },
    {
      value: training?.speed_avg_kmh,
      icon: statisticIconMapping[Statistic.SpeedAvg],
      unit: 'kmh',
    },
    {
      value: training?.heart_rate_avg_bpm,
      icon: statisticIconMapping[Statistic.HeartRateAvg],
      unit: 'bpm',
    },
  ];

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
          <span className="todayCard__contentHeader">
            Your training: {sportIconMapping[training?.sport]} {training?.sport}
          </span>
          <div className="todayCard__contentDetails">
            {detailsToShow.map((detail, index) =>
              detail.value !== null && detail.value !== 0 ? (
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
