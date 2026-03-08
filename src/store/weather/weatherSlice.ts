import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "@api/weather";
import { WeatherState } from "../../types/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const weather = await getWeather(city);
    console.log("API RESPONSE:", weather);
    return weather;
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

      // loading
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;

        state.weather = action.payload;
        state.temperature = action.payload.current.temp_c;
        state.condition = action.payload.current.condition.text;
      })

      // error
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Weather fetch failed";
      });
  },
});

export default weatherSlice.reducer;