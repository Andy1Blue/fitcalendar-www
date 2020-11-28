import * as React from 'react';
import { useEffect, useState } from 'react';
import './TodayCard.scss';

interface TodayCardProps {
  training: any;
}

const TodayCard = ({ training }: TodayCardProps) => {
  const [dayModalTraining, setDayModalTraining] = useState(null);

  useEffect(() => {
  
  }, []);

  return (
    <div className="todayCard">
      {training?.createdDate}
    </div>
  );
};
export default TodayCard;
