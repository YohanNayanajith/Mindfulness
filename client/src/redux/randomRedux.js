import { createSlice } from "@reduxjs/toolkit";

const randomRedux = createSlice({
  name: "random",
  initialState: {
    randomNumber: null,
  },
  reducers: {
    setRandomNumber: (state,action) => {
      state.randomNumber = action.payload;
    },
  },
});

export const { setRandomNumber } = randomRedux.actions;
export default randomRedux.reducer;
