import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { ChangeEvent, useEffect, useRef } from "react";
import { selectSelectedLanguages } from "@/slices/languages/languages-selects.ts";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { setAnswer } from "@/slices/languages/languages-slice.ts";

interface FormValues {
    input: string
}

export const useUserInput = (requestTranslate: any) => {
    const dispatch = useAppDispatch()

    const textareaRef = useRef<HTMLInputElement>();

    const { inputLanguage, responseLanguage} = useAppSelector(selectSelectedLanguages)

    // Get the search string from the location object and function that changes params
    const [searchParams, setSearchParams] = useSearchParams()

    // Get the source, target language and text from the searchParams object
    const text = searchParams.get('text')
    const sourceLanguageCode = searchParams.get("sl");
    const targetLanguageCode = searchParams.get("tl");

    const debouncedText = useDebounce(text, 1000);

    /*
     * Change handler for the form.
     * Updates the browser URL with the new text value and triggers the translation request.
     */
    const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
        const inputValue = e.target.value

        searchParams.set('sl', inputLanguage.code)
        searchParams.set('tl', responseLanguage.code)
        inputValue ? searchParams.set('text', inputValue) : searchParams.delete('text')

        // Update the browser URL with the new text value
        setSearchParams(searchParams)
    };


    // useEffect to trigger the debounced translation request whenever searchParams change
    useEffect(() => {
        if (debouncedText && sourceLanguageCode && targetLanguageCode) {
            const encodedParams = new URLSearchParams();

            encodedParams.set('source_language', sourceLanguageCode);
            encodedParams.set('target_language', targetLanguageCode);
            encodedParams.set('text', debouncedText);
            requestTranslate(encodedParams)
        }
    }, [debouncedText, sourceLanguageCode, targetLanguageCode]);

    // click handler for clear icon, clears the input and output
    const clear = (setFieldValue: any) => () => {
        setFieldValue('input', '')
        dispatch(setAnswer(null))

        textareaRef.current?.focus();
    }

    // Formik initial state
    const initialValues: FormValues = {
        input: searchParams.get('text') || ''
    }

    return {
        initialValues, handleFormChange, clear, textareaRef
    }
}