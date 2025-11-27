import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchForm: {
      name: "",
      email: "",
      phone: "",
    },
    paging: {
      page: 1,
      totalPages: 0,
    },
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchForm.name = action.payload.name;
      state.searchForm.email = action.payload.email;
      state.searchForm.phone = action.payload.phone;
    },
    clearSearch: (state) => {
      state.searchForm.name = "";
      state.searchForm.email = "";
      state.searchForm.phone = "";
    },
    setPage: (state, action) => {
      state.paging.page = action.payload.page;
      state.paging.totalPages = action.payload.totalPages;
    },
  },
});

export const { setSearch, clearSearch, setPage } = searchSlice.actions;
export default searchSlice.reducer;
