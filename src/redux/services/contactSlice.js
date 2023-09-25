import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState: {
    contacts: [],
    searchTerm: "",
  },
  reducers: {
    setContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { setContacts,setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
