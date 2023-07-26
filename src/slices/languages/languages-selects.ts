import { RootState } from "@/app/appStore.ts";

export const selectLoading = (state: RootState) => state.languages.isLoading

export const selectSelectedLanguages = (state: RootState) => state.languages.selectedLanguages

export const selectLanguagesLists = (state: RootState) => state.languages.languageList

// in select menu, list consists of 3
export const selectTranslation = (state: RootState) => state.languages.answer

// whole list of languages
export const selectAvailableLanguages = (state: RootState) => state.languages.languages