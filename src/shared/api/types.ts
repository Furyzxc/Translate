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

export interface TranslateRequestBody {
    sourceLanguageCode: string | null
    targetLanguageCode: string | null
    text: string | null
}