import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api/baseApi.ts";
import { languagesSlice } from "@/features/languages/languages-slice.ts";

export const rootReducer = combineReducers({
    [languagesSlice.name]: languagesSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
})