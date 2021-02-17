import * as React from 'react';
import { secondsToHms } from '../../helpers';
import { sportIconMapping } from '../../SportsConfig/Input';
import { Training } from '../../Types/Training';
import { actualMonth, actualYear } from '../../helpers';
import './UserPage.scss';
import { useState } from 'react';

interface UserPageProps {
  sumTrainingInYear?: Training | any;
  sumTrainingInMonth?: Training | any;
  theLargestAmountOfTimes?: Training;
  theLargestAmountOfDistances?: Training;
  theLargestAmountOfCalories?: Training;
}

const UserPage = ({
  sumTrainingInYear,
  sumTrainingInMonth,
  theLargestAmountOfTimes,
  theLargestAmountOfDistances,
  theLargestAmountOfCalories,
}: UserPageProps) => {
  const [currentYear] = useState(actualYear);
  const [currentMonth] = useState(actualMonth);

  const userStatistics = [
    { icon: 'label', name: 'Yearly summary' },
    { icon: '💪', name: 'Trainings in this year', value: sumTrainingInYear?.count, date: currentYear, sport: '-' },
    {
      icon: '🕐',
      name: 'Sum of duration in this year',
      value: secondsToHms(sumTrainingInYear[0].duration_sec),
      date: currentYear,
      sport: '-',
    },
    {
      icon: '👣',
      name: 'Sum of distance in this year',
      value: `${Math.round(sumTrainingInYear[0].distance_km)} km`,
      date: currentYear,
      sport: '-',
    },
    {
      icon: '🔥',
      name: 'Sum of calories burn in this year',
      value: `${Math.round(sumTrainingInYear[0].calories_kcal)} kcal`,
      date: currentYear,
      sport: '-',
    },
    { icon: 'label', name: 'Monthly summary' },
    {
      icon: '💪',
      name: 'Trainings in this month',
      value: sumTrainingInMonth?.count,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: '🕐',
      name: 'Sum of duration in this month',
      value: secondsToHms(sumTrainingInMonth[0].duration_sec),
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: '👣',
      name: 'Sum of distance in this month',
      value: `${Math.round(sumTrainingInMonth[0].distance_km)} km`,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: '🔥',
      name: 'Sum of calories burn in this month',
      value: `${Math.round(sumTrainingInMonth[0].calories_kcal)} kcal`,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    { icon: 'label', name: 'Records' },
    {
      icon: '🕐',
      name: 'The biggest duration',
      value: secondsToHms(theLargestAmountOfTimes?.duration_sec),
      date: theLargestAmountOfTimes?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfTimes?.sport]} ${theLargestAmountOfTimes?.sport}`,
    },
    {
      icon: '👣',
      name: 'The biggest distance',
      value: `${theLargestAmountOfDistances?.distance_km} km`,
      date: theLargestAmountOfDistances?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfDistances?.sport]} ${theLargestAmountOfDistances?.sport}`,
    },
    {
      icon: '🔥',
      name: 'The biggest calories burn',
      value: `${theLargestAmountOfCalories?.calories_kcal} kcal`,
      date: theLargestAmountOfCalories?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfCalories?.sport]} ${theLargestAmountOfCalories?.sport}`,
    },
  ];

  return (
    <div className="userPage">
      <table className="userPage__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
            <th>Date</th>
            <th>Sport</th>
          </tr>
        </thead>
        <tbody>
          {userStatistics &&
            userStatistics.map((item, index) => {
              if (item.icon === 'label') {
                return (
                  <tr key={index}>
                    <td colSpan={5}>{item.name}</td>
                  </tr>
                );
              }
              return (
                <tr key={index}>
                  <td>{item.icon}</td>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                  <td>{item.date}</td>
                  <td>{item.sport}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
