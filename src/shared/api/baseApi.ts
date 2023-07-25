import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_KEY = import.meta.env.VITE_API_KEY

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://text-translator2.p.rapidapi.com/',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    }),

    endpoints: () => ({})
})