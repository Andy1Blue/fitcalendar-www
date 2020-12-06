import { Sport } from '../Types/Training';

export const sportsInput: Sport[] = [Sport.Spinning, Sport.Run, Sport.Bike, Sport.Hiking, Sport.Other];

export const sportIconMapping = {
  [Sport.Spinning]: '🚴',
  [Sport.Run]: '🏃‍♂️',
  [Sport.Bike]: '🚵',
  [Sport.Hiking]: '🎒',
  [Sport.Other]: '⚪',
};
