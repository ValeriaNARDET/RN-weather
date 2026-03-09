import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, getForecast } from "@api/weather";
import { WeatherState } from "../../types/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (coords: { lat: number; lon: number }) => {
    const weather = await getWeather(coords);
    return weather;
  }
);


export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (coords: { lat: number; lon: number }) => {
    const forecast = await getForecast(coords);
    return forecast;
  }
);

const initialState: WeatherState = {
  weather: null,
  temperature: null,
  condition: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;

        state.weather = action.payload.current;
        state.temperature = action.payload?.current.temp_c;
        state.condition = action.payload?.current.condition.text;
      })
      
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Weather fetch failed";
      })
      
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("API RESPONSE :", action.payload.forecast);
      })
      
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Forecast fetch failed";
      });

  },
});

export default weatherSlice.reducer;