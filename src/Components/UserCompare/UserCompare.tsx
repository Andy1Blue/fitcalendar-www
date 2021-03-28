import * as React from 'react';
import { getUserYearCompare, getUserMonthCompare } from '../../Services/TrainingsCompareService';
import './UserCompare.scss';
import { useInput } from '../../Hooks/useInput';
import { useState } from 'react';
import Spinner from '../Loader/Spinner';
import { secondsToHms } from '../../helpers';
import { actualMonth, actualYear } from '../../helpers';

interface UserCompareProps {
  userEmail: string;
}

const UserCompare = ({ userEmail }: UserCompareProps) => {
  const [userTwoEmail, setUserTwoEmail] = useInput('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userStatistics, setUserStatistics] = useState([]);
  const [month, setMonth] = useInput(actualMonth);
  const [year, setYear] = useInput(actualYear);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const yearlyDataProps = {
      userOneEmail: userEmail,
      userTwoEmail,
      year: year.toString(),
    };

    const monhlyDataProps = {
      userOneEmail: userEmail,
      userTwoEmail,
      year: year.toString(),
      month: month.toString(),
    };

    const responseYear = await getUserYearCompare(yearlyDataProps);
    const responseMonth = await getUserMonthCompare(monhlyDataProps);

    if (responseYear?.status === 200 && responseMonth?.status === 200) {
      if (responseYear.data.compare.length > 0 && responseMonth.data.compare.length > 0) {
        setUserData(responseYear.data.compare);
        setUserStats(responseYear.data.compare, responseMonth.data.compare);
      } else {
        setUserData([]);
      }

      setIsLoading(false);
    }
  };

  const setUserStats = (yearData: Array<any>, monthData: Array<any>) => {
    setUserStatistics([
      { icon: 'label', name: 'Yearly summary' },
      {
        icon: '💪',
        name: 'Trainings',
        userOnevalue: yearData[0].count,
        userTwovalue: yearData[1].count,

        date: year,
      },
      {
        icon: '🕐',
        name: 'Duration',
        userOnevalue: secondsToHms(yearData[0].stats.duration_sec),
        userTwovalue: secondsToHms(yearData[1].stats.duration_sec),
        date: year,
        sport: '-',
      },
      {
        icon: '👣',
        name: 'Distance',
        userOnevalue: `${Math.round(yearData[0].stats.distance_km)} km`,
        userTwovalue: `${Math.round(yearData[1].stats.distance_km)} km`,
        date: year,
        sport: '-',
      },
      {
        icon: '🔥',
        name: 'Calories burn',
        userOnevalue: `${Math.round(yearData[0].stats.calories_kcal)} kcal`,
        userTwovalue: `${Math.round(yearData[1].stats.calories_kcal)} kcal`,
        date: year,
        sport: '-',
      },
      { icon: 'label', name: 'Monthly summary' },
      {
        icon: '💪',
        name: 'Trainings',
        userOnevalue: monthData[0].count,
        userTwovalue: monthData[1].count,

        date: `${year}-${month}`,
      },
      {
        icon: '🕐',
        name: 'Duration',
        userOnevalue: secondsToHms(monthData[0].stats.duration_sec),
        userTwovalue: secondsToHms(monthData[1].stats.duration_sec),
        date: `${year}-${month}`,
        sport: '-',
      },
      {
        icon: '👣',
        name: 'Distance',
        userOnevalue: `${Math.round(monthData[0].stats.distance_km)} km`,
        userTwovalue: `${Math.round(monthData[1].stats.distance_km)} km`,
        date: `${year}-${month}`,
        sport: '-',
      },
      {
        icon: '🔥',
        name: 'Calories burn',
        userOnevalue: `${Math.round(monthData[0].stats.calories_kcal)} kcal`,
        userTwovalue: `${Math.round(monthData[1].stats.calories_kcal)} kcal`,
        date: `${year}-${month}`,
        sport: '-',
      },
    ]);
  };

  return (
    <div className="userCompare">
      <div className="userCompare__formInputContainer">
        <input
          className="input__email"
          placeholder="User e-mail to compare"
          type="text"
          value={userTwoEmail}
          onChange={setUserTwoEmail}
        />
        <input className="input__year" placeholder="Year" type="text" value={year} onChange={setYear} />
        <button className="input__button" onClick={handleSubmit}>
          Compare
        </button>
      </div>

      <div className="userCompare__dataContainer">
        <div>{isLoading && <Spinner />}</div>
        <div>{!isLoading && userData.length === 0 && <span>No data!</span>}</div>
        {!isLoading && userData.length > 0 && (
          <table className="userCompare__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>You</th>
                <th>User to compare</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userStatistics &&
                userStatistics.map((item, index) => {
                  if (item.icon === 'label') {
                    return (
                      <tr key={index}>
                        <td className="userCompare__table--label" colSpan={5}>
                          {item.name}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index}>
                      <td className="userCompare__table--icon">{item.icon}</td>
                      <td className="userCompare__table--name">{item.name}</td>
                      <td className="userCompare__table--value">{item.userOnevalue}</td>
                      <td className="userCompare__table--value">{item.userTwovalue}</td>
                      <td className="userCompare__table--date">{item.date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserCompare;
