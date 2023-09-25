import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, { payload }) => {
      (state.user = payload.user),
        (state.token = payload.token),
        Cookies.set("user", JSON.stringify(state.user)),
        Cookies.set("token", state.token);
    },
    removeCookies: (state) => {
      (state.user = null),
        (state.token = null),
        Cookies.remove("user"),
        Cookies.remove("token");
    },
  },
});

export const { addUser, removeCookies } = authSlice.actions;
export default authSlice.reducer;
