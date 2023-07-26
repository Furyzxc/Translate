import { baseApi } from "@/shared/api/baseApi.ts";
import {
    LanguagesResponse,
    TranslateResponseBody
} from "@/shared/api/types.ts";

export const languagesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        requestLanguages: build.query<LanguagesResponse, void>({
            query: ()  => 'getLanguages'
        }),

        translate: build.mutation<TranslateResponseBody, any>({
            query: (body) => ({
                url: 'translate',
                method: 'post',
                body
            })
        })
    })
})