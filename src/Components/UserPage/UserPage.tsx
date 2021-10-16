import * as React from 'react';
import { secondsToHms } from '../../helpers';
import { sportIconMapping, statisticIconMapping } from '../../SportsConfig/Input';
import { Training } from '../../Types/Training';
import { actualMonth, actualYear } from '../../helpers';
import './UserPage.scss';
import { useState } from 'react';
import { Statistic } from '../../Types/Statistic';
import { generateCsvContent } from '../../Services/ReportService';
import * as dayjs from 'dayjs';

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
    {
      icon: statisticIconMapping[Statistic.Trainings],
      name: Statistic.Trainings,
      value: sumTrainingInYear?.count,
      date: currentYear,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Duration],
      name: Statistic.Duration,
      value: secondsToHms(sumTrainingInYear[0].duration_sec),
      date: currentYear,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Distance],
      name: Statistic.Distance,
      value: `${Math.round(sumTrainingInYear[0].distance_km)} km`,
      date: currentYear,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Calories],
      name: Statistic.Calories,
      value: `${Math.round(sumTrainingInYear[0].calories_kcal)} kcal`,
      date: currentYear,
      sport: '-',
    },
    { icon: 'label', name: 'Monthly summary' },
    {
      icon: statisticIconMapping[Statistic.Trainings],
      name: Statistic.Trainings,
      value: sumTrainingInMonth?.count,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Duration],
      name: Statistic.Duration,
      value: secondsToHms(sumTrainingInMonth[0].duration_sec),
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Distance],
      name: Statistic.Distance,
      value: `${Math.round(sumTrainingInMonth[0].distance_km)} km`,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    {
      icon: statisticIconMapping[Statistic.Calories],
      name: Statistic.Calories,
      value: `${Math.round(sumTrainingInMonth[0].calories_kcal)} kcal`,
      date: `${currentYear}-${currentMonth}`,
      sport: '-',
    },
    { icon: 'label', name: 'Records' },
    {
      icon: statisticIconMapping[Statistic.Duration],
      name: Statistic.Duration,
      value: secondsToHms(theLargestAmountOfTimes?.duration_sec),
      date: theLargestAmountOfTimes?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfTimes?.sport]} ${theLargestAmountOfTimes?.sport}`,
    },
    {
      icon: statisticIconMapping[Statistic.Distance],
      name: Statistic.Distance,
      value: `${theLargestAmountOfDistances?.distance_km} km`,
      date: theLargestAmountOfDistances?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfDistances?.sport]} ${theLargestAmountOfDistances?.sport}`,
    },
    {
      icon: statisticIconMapping[Statistic.Calories],
      name: Statistic.Calories,
      value: `${theLargestAmountOfCalories?.calories_kcal} kcal`,
      date: theLargestAmountOfCalories?.start_time,
      sport: `${sportIconMapping[theLargestAmountOfCalories?.sport]} ${theLargestAmountOfCalories?.sport}`,
    },
  ];

  const downloadCsvFile = async () => {
    let response = await generateCsvContent({});

    if (response?.data) {
      const csv = response.data;

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';

      hiddenElement.download = `fitcalendar${dayjs().format('HHmmDDMMYYYY')}.csv`;
      hiddenElement.click();
    }
  };

  return (
    <div className="userPage">
      <div>
        <button className="input__button" onClick={downloadCsvFile}>
          Export data
        </button>
      </div>
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
                    <td className="userPage__table--label" colSpan={5}>
                      {item.name}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={index}>
                  <td className="userPage__table--icon">{item.icon}</td>
                  <td className="userPage__table--name">{item.name}</td>
                  <td className="userPage__table--value">{item.value}</td>
                  <td className="userPage__table--date">{item.date}</td>
                  <td className="userPage__table--sport">{item.sport}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
