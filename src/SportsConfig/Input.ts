import { Sport } from '../Types/Training';

export const sportsInput: Sport[] = [
  Sport.Spinning,
  Sport.ExerciseBike,
  Sport.Tabata,
  Sport.Run,
  Sport.Walk,
  Sport.Bike,
  Sport.Hiking,
  Sport.Other,
];

export const sportIconMapping = {
  [Sport.Spinning]: '🚴',
  [Sport.ExerciseBike]: '🚴‍♂️',
  [Sport.Tabata]: '🤸‍♀️',
  [Sport.Run]: '🏃‍♂️',
  [Sport.Walk]: '🚶',
  [Sport.Bike]: '🚵',
  [Sport.Hiking]: '🎒',
  [Sport.Other]: '⚪',
};
