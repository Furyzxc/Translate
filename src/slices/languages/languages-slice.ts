import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { languagesApi } from "@/slices/languages/languages-api.ts";
import { requestTranslate } from "@/slices/languages/languages-thunks.ts";


export interface LanguageType {
    code: string // 'en'
    name: string // 'English'
}

// InitialState interface
interface Languages {
    isLoading: boolean

    languageList: { // in select language menu
        leftList: LanguageType[]
        rightList: LanguageType[]
    }

    selectedLanguages: {
        inputLanguage: LanguageType // Selected source language
        responseLanguage: LanguageType // selected target language
    }

    answer: string | null // answer to translation request

    languages: LanguageType[] // list of available languages, used in droplist
}

const initialState: Languages = {
    isLoading: false,

    languageList: {
        // set initial languages that list was not empty
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

    selectedLanguages: {
        inputLanguage: {
            code: 'en',
            name: 'English',
        },
        responseLanguage: {
            code: 'es',
            name: 'Spanish',
        }
    },

    answer: null,

    languages: []
}

// Interface for setLanguage reducer
interface SetSelectedLanguageBody {
    side: 'source' | 'target',
    language: LanguageType
}

// Interface for swapLanguages reducer
interface SwapLanguages {
    inputLanguage: LanguageType
    responseLanguage: LanguageType
}

// Interface for changeLanguageList reducer
interface ChangeLanguageList extends LanguageType {
    side: 'left' | 'right'
}

export const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        // Action to set the answer to a translation request
        setAnswer(state, action: PayloadAction<string | null>) {
            state.answer = action.payload
        },

        // Action to swap languages, state is destructured
        swapLanguages({selectedLanguages, languageList}, {payload}: PayloadAction<SwapLanguages>) {
            // Swap the input and response languages
            [selectedLanguages.inputLanguage, selectedLanguages.responseLanguage] = [
                payload.responseLanguage,
                payload.inputLanguage,
            ];

            // getting our lists of languages for select from state
            const {leftList, rightList} = languageList

            // Helper function to update the language list with the specified language
            const updateLanguage = (list: LanguageType[], language: LanguageType) => {
                const index = list.findIndex((lang) => lang.code === language.code);

                if (index !== -1) list[index] = language;
            };

            updateLanguage(leftList, payload.responseLanguage);
            updateLanguage(rightList, payload.inputLanguage);
        },

        // Action to set the selected language (input or response), destructured state
        setLanguage({selectedLanguages}, {payload}: PayloadAction<SetSelectedLanguageBody>) {
            if (payload.side === "source") {
                selectedLanguages.inputLanguage = payload.language
            }
            if (payload.side === "target") {
                selectedLanguages.responseLanguage = payload.language
            }
        },

        // Action to change the language list (left or right side)
        changeLanguageList(state, {payload}: PayloadAction<ChangeLanguageList>) {
            const {code, name, side} = payload;

            const list = side === 'left'
                ? state.languageList.leftList
                : state.languageList.rightList;

            // finding in list existing language and then returns index of it, else findIndex returns -1
            const index = list.findIndex(lang => lang.code === code);

            // keep always 3 languages
            if (index !== -1) {
                list[index] = {code, name};
            } else {
                list.pop();
                list.push({code, name});
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(requestTranslate.pending,
            state => {
                state.isLoading = true
            })

        builder.addCase(requestTranslate.fulfilled,
            state => {
                state.isLoading = false
            })

        builder.addMatcher(languagesApi.endpoints.requestLanguages.matchFulfilled,
            (state, action) => {
                state.languages = action.payload.data.languages
            })
    }
})

// actions
export const {
    setAnswer,
    swapLanguages,
    setLanguage,
    changeLanguageList
} = languagesSlice.actions