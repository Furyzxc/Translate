export interface LanguagesResponse {
    data: {
        languages: {
            code: string  // 'en'
            name: string // 'English'
        }[]
    }
}

export interface TranslateResponseBody {
    data: {
        translatedText: string
    }
}