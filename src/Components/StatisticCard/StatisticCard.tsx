import * as React from 'react';
import { useEffect, useState } from 'react';
import { secondsToHms } from '../../helpers';
import { statisticIconMapping } from '../../SportsConfig/Input';
import { Statistic } from '../../Types/Statistic';
import { Training } from '../../Types/Training';
import './StatisticCard.scss';
interface StatisticCardProps {
  type: Statistic;
  data: Training | any;
}

const StatisticCard = ({ type, data }: StatisticCardProps) => {
  const [mappedStatistic, setMappedStatistic] = useState(null);

  const StatisticTypesMapping = [
    {
      type: Statistic.Duration,
      icon: statisticIconMapping[Statistic.Duration],
      title: 'The biggest duration',
      statValue: secondsToHms(data?.duration_sec),
      unit: '',
      startTime: data?.start_time,
    },
    {
      type: Statistic.Distance,
      icon: statisticIconMapping[Statistic.Distance],
      title: 'The biggest distance',
      unit: 'km',
      statValue: data?.distance_km,
      startTime: data?.start_time,
    },
    {
      type: Statistic.Calories,
      icon: statisticIconMapping[Statistic.Calories],
      title: 'The biggest calories burn',
      unit: 'kcal',
      statValue: data?.calories_kcal,
      startTime: data?.start_time,
    },
    {
      type: Statistic.SumTrainingsInYear,
      icon: statisticIconMapping[Statistic.Trainings],
      title: 'Trainings in this year',
      statValue: data?.count,
      startTime: '',
    },
    {
      type: Statistic.SumTrainingsInMonth,
      icon: statisticIconMapping[Statistic.Trainings],
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
