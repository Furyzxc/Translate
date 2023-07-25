import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from "../shared/api/baseApi.ts";
import { rootReducer } from "./rootReducer.ts";

export const appStore = configureStore({
    reducer: rootReducer,

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(baseApi.middleware)
    }
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch