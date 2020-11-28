import * as React from 'react';
import { useEffect } from 'react';
import './CalendarTiles.scss';

interface CalendarTilesProps {
  className: string;
  month: number;
}

const CalendarTiles = ({ className, month }: CalendarTilesProps) => {
  // const [trainings, setTrainings] = useState(null);

  const actualYear = () => new Date().getFullYear();
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

  const addTile = (day: number, month: number, year: number) => {
    const rectElement = document.createElement('rect');
    rectElement.className = 'day';

    const innerDay = day >= 10 ? day : `0${day}`;
    rectElement.innerHTML = innerDay.toString();

    const monthElement = document.getElementById('root').querySelector(`.month${month}`);
    monthElement.appendChild(rectElement);
  };

  const generateTiles = () => {
    if (true) {
      for (let day = 1; day <= daysInMonth(month, actualYear()); day++) {
        addTile(day, month, actualYear());
      }
    }
  };

  useEffect(() => {
    generateTiles();
  }, []);

  return (
    <div className="calendarTiles">
      <div className={className}></div>
    </div>
  );
};
export default CalendarTiles;
