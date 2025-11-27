import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "token",
  initialState: {
    data: {
      token: "",
      username: "",
      name: "",
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.data.token = action.payload;
    },
    setUser: (state, action) => {
      state.data.username = action.payload.username;
      state.data.name = action.payload.name;
    },
    clearData: (state) => {
      state.data.token = "";
      state.data.username = "";
      state.data.name = "";
    },
  },
});

export const { setToken, setUser, clearData } = userDataSlice.actions;
export default userDataSlice.reducer;
