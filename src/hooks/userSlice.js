import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserSlice } = userSlice.actions;
export default userSlice.reducer;
