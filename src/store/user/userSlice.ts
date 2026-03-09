import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/user";

const initialState: UserState = {
  city: "",
  coords: { lat: 0, lon: 0 },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<UserState["city"]>) => {
      state.city = action.payload;
    },
    setCoords: (state, action: PayloadAction<UserState["coords"]>) => {
      state.coords = action.payload;
    },
  },
});

export const { setCity, setCoords } = userSlice.actions;
export default userSlice.reducer;