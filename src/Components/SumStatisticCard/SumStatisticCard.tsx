import * as React from 'react';
import { useEffect } from 'react';
import { secondsToHms } from '../../helpers';
import './SumStatisticCard.scss';

interface SumStatisticCardProps {
  label: string;
  sumWorkouts: number;
  sumDuration: number;
  sumDistance: number;
  sumCalories: number;
}

const SumStatisticCard = ({ label, sumWorkouts, sumDuration, sumDistance, sumCalories }: SumStatisticCardProps) => {
  useEffect(() => {}, [sumWorkouts]);

  return (
    <>
      {sumWorkouts && (
        <div className="statisticCard">
          <div className="statisticCard__header">{label}</div>
          <div className="statisticCard__contentDetails">
            <span>
              <span className="icon">💪</span> {sumWorkouts} workouts
            </span>

            <span>
              <span className="icon">🕐</span> {secondsToHms(sumDuration)}
            </span>

            <span>
              <span className="icon">👣</span> {sumDistance} km
            </span>

            <span>
              <span className="icon">🔥</span> {sumCalories} kcal
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default SumStatisticCard;
