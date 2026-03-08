import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/user/userSlice";
import weatherReducer from "./weather/weatherSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        weather: weatherReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;