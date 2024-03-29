import { Sport } from '../Types/Training';
import { Statistic } from '../Types/Statistic';

export const sportsInput: Sport[] = [
  Sport.Spinning,
  Sport.ExerciseBike,
  Sport.Tabata,
  Sport.Run,
  Sport.Walk,
  Sport.Bike,
  Sport.Hiking,
  Sport.Soccer,
  Sport.Basketball,
  Sport.Tennis,
  Sport.Golf,
  Sport.Volleyball,
  Sport.Badminton,
  Sport.Swimming,
  Sport.Table_Tennis,
  Sport.Skiing,
  Sport.Roller_Skating,
  Sport.Other,
];

export const sportIconMapping = {
  [Sport.Spinning]: '🚴',
  [Sport.ExerciseBike]: '🚴‍♂️',
  [Sport.Tabata]: '🤸‍♀️',
  [Sport.Run]: '🏃‍♂️',
  [Sport.Walk]: '🚶',
  [Sport.Bike]: '🚲',
  [Sport.Hiking]: '🎒',
  [Sport.Soccer]: '⚽',
  [Sport.Basketball]: '🏀',
  [Sport.Tennis]: '🎾',
  [Sport.Golf]: '🏌',
  [Sport.Volleyball]: '🏐',
  [Sport.Badminton]: '🏸',
  [Sport.Swimming]: '🏊',
  [Sport.Table_Tennis]: '🏓',
  [Sport.Skiing]: '⛷',
  [Sport.Roller_Skating]: '⚫',
  [Sport.Other]: '⚪',
};

export const statisticIconMapping = {
  [Statistic.Trainings]: '💪',
  [Statistic.Duration]: '🕐',
  [Statistic.Distance]: '👣',
  [Statistic.Calories]: '🔥',
  [Statistic.HeartRateAvg]: '💓',
  [Statistic.SpeedAvg]: '🚀',
  [Statistic.SpeedMax]: '🚀',
  [Statistic.SumTrainingsInMonth]: '💪',
  [Statistic.SumTrainingsInYear]: '💪',
};

// TODO
export const statisticMapping = {
  [Statistic.Trainings]: {
    name: Statistic.Trainings,
    icon: statisticIconMapping[Statistic.Trainings],
    unit: 'workouts'
  },
  [Statistic.Duration]: {
    name: Statistic.Duration,
    icon: statisticIconMapping[Statistic.Duration],
    unit: 'min'
  }
}