import * as React from 'react';
import { Training } from '../../Types/Training';
import './StatisticCard.scss';

interface StatisticCardProps {
  title: string;
  training: Training;
}

const StatisticCard = ({ title, training }: StatisticCardProps) => {
  return (
    <div className="statisticCard">
      <h4>
        {title} ({training?.start_time})
      </h4>
      <div className="todayCard__contentDetails">
        <span>
          <span className="icon">👣</span> {training.calories_kcal}
        </span>
      </div>
    </div>
  );
};
export default StatisticCard;
