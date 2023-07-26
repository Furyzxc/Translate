import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_KEY = import.meta.env.VITE_API_KEY
const API_HOST = import.meta.env.VITE_API_HOST

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://microsoft-translator-text.p.rapidapi.com/',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }),

    endpoints: () => ({})
})