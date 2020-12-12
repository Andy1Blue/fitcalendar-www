import * as React from 'react';
import { useEffect, useState } from 'react';
import { secondsToHms } from '../../helpers';
import { Training } from '../../Types/Training';
import './StatisticCard.scss';

export const enum StatisticTypes {
  Time = 'Time',
  Distance = 'Distance',
  Calories = 'Calories',
  SumTrainingsInYear = 'SumTrainingsInYear',
  SumTrainingsInMonth = 'SumTrainingsInMonth',
}

interface StatisticCardProps {
  type: StatisticTypes;
  data: Training | any;
}

const StatisticCard = ({ type, data }: StatisticCardProps) => {
  const [mappedStatistic, setMappedStatistic] = useState(null);

  const StatisticTypesMapping = [
    {
      type: StatisticTypes.Time,
      icon: '🕐',
      title: 'The biggest duartion',
      statValue: secondsToHms(data?.duration_sec),
      unit: '(hh:mm:ss)',
      startTime: data?.start_time,
    },
    {
      type: StatisticTypes.Distance,
      icon: '👣',
      title: 'The biggest distance',
      unit: 'km',
      statValue: data?.distance_km,
      startTime: data?.start_time,
    },
    {
      type: StatisticTypes.Calories,
      icon: '🔥',
      title: 'The biggest calories burn',
      unit: 'kcal',
      statValue: data?.calories_kcal,
      startTime: data?.start_time,
    },
    {
      type: StatisticTypes.SumTrainingsInYear,
      icon: '💪',
      title: 'Trainings in this year',
      statValue: data?.count,
      startTime: '',
    },
    {
      type: StatisticTypes.SumTrainingsInMonth,
      icon: '💪',
      title: 'Trainings in this month',
      statValue: data?.count,
      startTime: '',
    },
  ];

  useEffect(() => {
    setMappedStatistic(StatisticTypesMapping.find((mappedStatistic) => mappedStatistic.type === type));
  }, [data]);

  return (
    <>
      {data && mappedStatistic && mappedStatistic.statValue !== 0 && (
        <div className="statisticCard">
          <div className="statisticCard__header">{mappedStatistic.title}</div>
          <div className="statisticCard__contentDetails">
            {mappedStatistic.startTime !== '' && (
              <span>
                <span className="icon">🗓</span> {mappedStatistic.startTime}
              </span>
            )}
            <span>
              <span className="icon">{mappedStatistic.icon}</span> {mappedStatistic.statValue} {mappedStatistic.unit}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default StatisticCard;
