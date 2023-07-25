import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/appStore.ts";
import { languagesApi } from "@/features/languages/languages-api.ts";

export interface LanguageType {
    code: string // 'en'
    name: string // 'English'
}

interface Languages {
    languageList: { // in select language menu
        leftList: LanguageType[]
        rightList: LanguageType[]
    }

    inputLanguage: LanguageType | undefined
    responseLanguage: LanguageType | undefined

    answer: string | null

    languages: LanguageType[]
}

const initialState: Languages = {
    languageList: {
        leftList: [
            {code: 'en', name: 'English'},
            {code: 'uk', name: 'Ukranian'},
            {code: 'es', name: 'Spanish'},
        ],
        rightList: [
            {code: 'en', name: 'English'},
            {code: 'uk', name: 'Ukranian'},
            {code: 'es', name: 'Spanish'},
        ],
    },

    inputLanguage: undefined,
    responseLanguage: undefined,

    answer: null,

    languages: []
}

interface SetSelectedLanguageBody {
    side: 'source' | 'target',
    language: LanguageType
}

interface SwapLanguages {
    inputLanguage: LanguageType | undefined
    responseLanguage: LanguageType | undefined
}

interface ChangeLanguageList extends LanguageType {
    side: 'left' | 'right'
}

export const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setAnswer(state, action: PayloadAction<string>) {
            state.answer = action.payload
        },

        swapLanguages(state, {payload}: PayloadAction<SwapLanguages>) {
            state.inputLanguage = payload.responseLanguage
            state.responseLanguage = payload.inputLanguage

            const { leftList, rightList } = state.languageList

            if (payload.responseLanguage) {
                const leftIndex = leftList.findIndex(lang => lang.code === payload.inputLanguage?.code)

                if (leftIndex !== -1) leftList[leftIndex] = payload.responseLanguage
            }

            if (payload.inputLanguage) {
                const rightIndex = rightList.findIndex(lang => lang.code === payload.responseLanguage?.code)

                if (rightIndex !== -1) rightList[rightIndex] = payload.responseLanguage
            }
        },

        setLanguage(state, {payload}: PayloadAction<SetSelectedLanguageBody>) {
            payload.side === "source"
                ? state.inputLanguage = payload.language
                : state.responseLanguage = payload.language
        },

        changeLanguageList(state, {payload}: PayloadAction<ChangeLanguageList>) {
            const { code, name, side } = payload;
            const list = side === 'left' ? state.languageList.leftList : state.languageList.rightList;

            // finding in list existing language and then returns index of it, else return -1
            const index = list.findIndex(lang => lang.code === code);

            // keep always 3 languages
            if (index !== -1) {
                list[index] = { code, name };
            }
            else {
                list.pop();
                list.push({ code, name });
            }
        }
    },
    extraReducers: builder => {
        builder.addMatcher(languagesApi.endpoints.requestLanguages.matchFulfilled,
            (state, action) => {
                state.languages = action.payload.data.languages
            })
    }
})

export const {
    setAnswer,
    swapLanguages,
    setLanguage,
    changeLanguageList
} = languagesSlice.actions

export const selectLangState = (state: RootState) => state.languages