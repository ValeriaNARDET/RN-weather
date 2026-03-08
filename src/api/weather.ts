import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getWeather = async (city: string) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json`,
    {
      params: {
        q: city,
        key: API_KEY,
        aqi: "no",
      },
    }
  );
  return response.data;
};

// http://api.weatherapi.com/v1/current.json?key=345&q=Lviv&aqi=no
