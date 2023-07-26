import { languagesApi } from "./languages-api.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/app/appStore.ts";
import { LanguageType, setAnswer, setLanguage, swapLanguages } from "@/slices/languages/languages-slice.ts";
import { TranslateRequestBody } from "@/shared/api/types.ts";

/**
 * Action creator to set the selected language.
 * If the new language is equal to the language on the opposite side, swaps the languages.
 * Otherwise, sets the language for the specified side.
 * @param side - The side to set the language ('source' or 'target').
 * @param language - The language object to set.
 */
const setSelectedLanguage = (side: "source" | "target", language: LanguageType) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { inputLanguage, responseLanguage } = getState().languages.selectedLanguages;

        // Check if the new language is equal to the language on the opposite side - just swap them
        if (language?.code === (side === "source" ? responseLanguage?.code : inputLanguage?.code)) {
            dispatch(swapLanguages({inputLanguage, responseLanguage}));
        } else {
            dispatch(setLanguage({ language, side }));
        }
    };
};

/**
 * Thunk to set the source language.
 * @param newInputLanguage - The new source language to set.
 */
export const setSourceLang = (newInputLanguage: LanguageType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setSelectedLanguage("source", newInputLanguage));
    };
};

/**
 * Thunk to set the target language.
 * @param newResponseLanguage - The new target language to set.
 */
export const setTargetLang = (newResponseLanguage: LanguageType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setSelectedLanguage("target", newResponseLanguage));
    };
};

// Async thunk to request languages from the API.
export const requestLanguages = createAsyncThunk('languages/requestLanguages',
    async (_, {dispatch}) => {
        await dispatch(languagesApi.endpoints.requestLanguages.initiate())
    })

// Async thunk to request translation from the API.
export const requestTranslate = createAsyncThunk('languages/requestTranslate',
    async ({text, sourceLanguageCode, targetLanguageCode}: TranslateRequestBody, {dispatch}) => {
        if (text && sourceLanguageCode && targetLanguageCode) {
            const encodedParams = new URLSearchParams();

            encodedParams.set('source_language', sourceLanguageCode);
            encodedParams.set('target_language', targetLanguageCode);
            encodedParams.set('text', text);

            await dispatch(languagesApi.endpoints.translate.initiate(encodedParams)).then(({data}: any) => {
                data && dispatch(setAnswer(data.data.translatedText))
            })
        }
    })
