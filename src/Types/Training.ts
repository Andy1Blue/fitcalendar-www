export interface Location {
  latitude: number;
  longitude: number;
}

export interface Points {
  distance_km?: number;
  speed_kmh?: number;
  heart_rate_bpm?: number;
  timestamp: Date;
  location?: Location[];
  altitude?: number;
}

export const enum Source {
  Manual = 'Manual',
}

export const enum Sport {
  Spinning = 'Spinning',
  Run = 'Run',
  Bike = 'Bike',
  Other = 'Other',
}

export interface Training {
  userId: string;
  sport: Sport;
  source?: Source;
  created_date: string; // format 0000-00-00 00:00:00
  update_date: string; // format 0000-00-00 00:00:00
  start_time: string; // format 0000-00-00 00:00:00
  end_time: string; // format 0000-00-00 00:00:00
  duration_sec: number;
  distance_km?: number;
  calories_kcal?: number;
  heart_rate_avg_bpm?: number;
  heart_rate_max_bpm?: number;
  speed_avg_kmh?: number;
  speed_max_kmh?: number;
  points?: Points[];
}
