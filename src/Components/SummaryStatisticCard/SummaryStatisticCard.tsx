import * as React from 'react';
import { useEffect } from 'react';
import { secondsToHms } from '../../helpers';
import { statisticIconMapping } from '../../SportsConfig/Input';
import { Statistic } from '../../Types/Statistic';
import './SummaryStatisticCard.scss';

interface SummaryStatisticCardProps {
  label: string;
  sumWorkouts: number;
  sumDuration: number;
  sumDistance: number;
  sumCalories: number;
}

const SummaryStatisticCard = ({
  label,
  sumWorkouts,
  sumDuration,
  sumDistance,
  sumCalories,
}: SummaryStatisticCardProps) => {
  useEffect(() => {}, [sumWorkouts]);

  return (
    <>
      {sumWorkouts > 0 && (
        <div className="statisticCard">
          <div className="statisticCard__header">{label}</div>
          <div className="statisticCard__contentDetails">
            <span>
              <span className="icon">{statisticIconMapping[Statistic.Trainings]}</span> {sumWorkouts} workouts
            </span>

            <span>
              <span className="icon">{statisticIconMapping[Statistic.Duration]}</span> {secondsToHms(sumDuration)}
            </span>

            <span>
              <span className="icon">{statisticIconMapping[Statistic.Distance]}</span> {Math.round(sumDistance)} km
            </span>

            <span>
              <span className="icon">{statisticIconMapping[Statistic.Calories]}</span> {Math.round(sumCalories)} kcal
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default SummaryStatisticCard;
