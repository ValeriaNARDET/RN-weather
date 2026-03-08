import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/user";

const initialState: UserState = {
  city: "Kyiv",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<UserState["city"]>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = userSlice.actions;
export default userSlice.reducer;