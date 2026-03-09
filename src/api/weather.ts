import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const getForecast = async (coords:{ lat: number, lon: number}) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json`,
    {
      params: {
        q: `${coords.lat},${coords.lon}`,
        key: API_KEY,
        days: 3,
        alerts: "no",
        aqi: "no",
      },
    }
  );
  return response.data || null;
};

const getWeather = async (coords:{ lat: number, lon: number}) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json`,
    {
      params: {
        key: API_KEY,
        q: `${coords.lat},${coords.lon}`,
        aqi: "no",
      },
    }
  );

  return response.data || null;
};

export { getWeather, getForecast };
