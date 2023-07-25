import { languagesApi } from "./languages-api.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/app/appStore.ts";
import { LanguageType, setAnswer, setLanguage, swapLanguages } from "@/features/languages/languages-slice.ts";


const setSelectedLanguage = (side: "source" | "target", language: LanguageType, oppositeLanguage: LanguageType | undefined) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        const { inputLanguage, responseLanguage} = getState().languages;

        // check, if new language is equal to language on the opposite side - just swap them
        if (language?.code === oppositeLanguage?.code) {
            dispatch(swapLanguages({
                inputLanguage, responseLanguage
            }));
        } else {
            dispatch(setLanguage({
                language,
                side,
            }));
        }
    };

// sets newInputLanguage as source language
export const setSourceLang = (newInputLanguage: LanguageType) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSelectedLanguage("source", newInputLanguage, getState().languages.responseLanguage));
    };

// sets newTargetLanguage as target language
export const setTargetLang = (newResponseLanguage: LanguageType) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSelectedLanguage("target", newResponseLanguage, getState().languages.inputLanguage));
    };


export const requestLanguages = createAsyncThunk('languages/requestLanguages',
    async (_, {dispatch}) => {
        await dispatch(languagesApi.endpoints.requestLanguages.initiate())
    })

export const requestTranslate = createAsyncThunk('languages/requestTranslate',
    async (text: string, {dispatch, getState}) => {
        const {languages} = getState() as RootState

        const {inputLanguage, responseLanguage} = languages

        if (text && inputLanguage && responseLanguage) {
            const encodedParams = new URLSearchParams();

            encodedParams.set('source_language', inputLanguage.code);
            encodedParams.set('target_language', responseLanguage.code);
            encodedParams.set('text', text);

            await dispatch(languagesApi.endpoints.translate.initiate(encodedParams)).then(({data}: any) => {
                data && dispatch(setAnswer(data.data.translatedText))
            })
        }
    })
