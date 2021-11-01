import * as React from 'react';
import { useEffect, useState } from 'react';
import './MonthView.scss';
import DayModal from '../DayModal/DayModal';
import { Training } from '../../Types/Training';
import * as dayjs from 'dayjs';

interface MonthViewProps {
  className: string;
  userEmail: string;
  month: number;
  year: number;
  trainings: Training[];
  isRefreshing: (isRefreshing: boolean) => void;
}

// TODO: refactor it, create new components for every views
const MonthView = ({ className, userEmail, month: currentMonth, year, trainings, isRefreshing }: MonthViewProps) => {
  const [month, setMonth] = useState(currentMonth);
  const [isDayModalVisible, setIsShowDayModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [dayModalTraining, setDayModalTraining] = useState(null);
  const [dayModalTrainingDate, setDayModalTrainingDate] = useState(null);

  const openDayModal = (training: Training | null, parsedDate?: string) => () => {
    setDayModalTraining(training);
    setDayModalTrainingDate(parsedDate);
    setIsShowDayModal(true);
  };

  const parsedMonth = month >= 10 ? month : `0${month}`;
  const selectedMonth = `${year}-${parsedMonth}`;
  const monthName = `${dayjs(selectedMonth).format('MMMM')} (${dayjs(selectedMonth).format('YYYY')})`;

  const tiles = [...Array(dayjs(`${year}-${parsedMonth}`).daysInMonth())].map((_, index) => {
    const day = index + 1;
    const parsedDay = day >= 10 ? day : `0${day}`;
    const parsedDate = `${year}-${parsedMonth}-${parsedDay}`;

    const training = trainings.find((t) => t.start_time === parsedDate);

    return (
      <tr key={parsedDay} onClick={openDayModal(training || null, parsedDate)}>
        <td>{training?.start_time || `${parsedDate}`}</td>
        <td>{training?.sport || '-'}</td>
        <td>{training?.description || '-'}</td>
      </tr>
    );
  });

  useEffect(() => {
    if (isPosting) {
      isRefreshing(true);
    }
  }, [isPosting]);

  return (
    <div>
      <div className="monthView__header">
        <button
          className={`monthView__subtractMonth ${month <= 1 && 'button--gray'}`}
          type="submit"
          onClick={() => setMonth(month - 1)}
          disabled={month <= 1}
        >
          &#10148;
        </button>
        <button className="monthView__actualMonth" type="submit" onClick={() => setMonth(currentMonth)}>
          &#x2738;
        </button>
        <h2 className="monthView__headerTitle">{monthName}</h2>
        <button
          className={`monthView__addMonth ${month >= 12 && 'button--gray'}`}
          type="submit"
          onClick={() => setMonth(month + 1)}
          disabled={month >= 12}
        >
          &#10148;
        </button>
      </div>
      <table className="monthView__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sport</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{...tiles}</tbody>
      </table>

      {isDayModalVisible && (
        <DayModal
          isDayModalVisible={(isVisible: boolean) => setIsShowDayModal(isVisible)}
          isPosted={(isPosted: boolean) => setIsPosting(isPosted)}
          training={dayModalTraining}
          trainingDate={dayModalTrainingDate}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default MonthView;
