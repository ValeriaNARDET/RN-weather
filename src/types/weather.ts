export interface WeatherState {
  weather: any;
  temperature: number | null;
  condition: string | null;
  loading: boolean;
  error: string | null;
}
