import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api/baseApi.ts";
import { languagesSlice } from "@/slices/languages/languages-slice.ts";
import { dropdownListSlice } from "@/slices/dropdownList/dropdownList-slice.ts";

export const rootReducer = combineReducers({
    [dropdownListSlice.name]: dropdownListSlice.reducer,
    [languagesSlice.name]: languagesSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
})