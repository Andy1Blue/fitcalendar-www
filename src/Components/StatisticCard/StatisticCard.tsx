import * as React from 'react';
import { useEffect, useState } from 'react';
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
      title: 'Sum of trainings time',
      stat: data?.duration_sec,
      unit: 'sec',
      start_time: data?.start_time,
    },
    {
      type: StatisticTypes.Distance,
      icon: '👣',
      title: 'Sum of trainings distance',
      unit: 'km',
      stat: data?.distance_km,
      start_time: data?.start_time,
    },
    {
      type: StatisticTypes.Calories,
      icon: '🔥',
      title: 'Sum of trainings calories',
      unit: 'kcal',
      stat: data?.calories_kcal,
      start_time: data?.start_time,
    },
    {
      type: StatisticTypes.SumTrainingsInYear,
      icon: '💪',
      title: 'Trainings in this year',
      stat: data?.count,
      start_time: '',
    },
    {
      type: StatisticTypes.SumTrainingsInMonth,
      icon: '💪',
      title: 'Trainings in this month',
      stat: data?.count,
      start_time: '',
    },
  ];

  useEffect(() => {
    setMappedStatistic(StatisticTypesMapping.find((mappedStatistic) => mappedStatistic.type === type));
  }, [data]);

  return (
    <>
      {data && mappedStatistic && (
        <div className="statisticCard">
          <div className="statisticCard__header">{mappedStatistic.title}</div>
          <div className="statisticCard__contentDetails">
            {mappedStatistic.start_time !== '' && (
              <div>
                <span className="icon">🗓</span> {mappedStatistic.start_time}
              </div>
            )}
            <div>
              <span className="icon">{mappedStatistic.icon}</span> {mappedStatistic.stat} {mappedStatistic.unit}
            </div>
          </div>
        </div>
      )}

      {!data && !mappedStatistic && <h5>No records</h5>}
    </>
  );
};
export default StatisticCard;
