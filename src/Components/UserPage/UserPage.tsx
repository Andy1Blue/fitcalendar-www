import * as React from 'react';
import { secondsToHms } from '../../helpers';
import { sportIconMapping } from '../../SportsConfig/Input';
import { Training } from '../../Types/Training';
import './UserPage.scss';

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
  const userStatistics = [
    { icon: '💪', name: 'Trainings in this year', value: sumTrainingInYear?.count, date: '-', sport: '-' },
    { icon: '💪', name: 'Trainings in this month', value: sumTrainingInMonth?.count, date: '-', sport: '-' },
    {
      icon: '🕐',
      name: 'The biggest duration',
      value: `${secondsToHms(theLargestAmountOfTimes?.duration_sec)} (hh:mm:ss)`,
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
