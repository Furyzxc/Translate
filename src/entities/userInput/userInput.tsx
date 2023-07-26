import s from './input.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { useSearchParams } from 'react-router-dom'
import { setAnswer } from "@/slices/languages/languages-slice.ts";
import { requestTranslate } from "@/slices/languages/languages-thunks.ts";
import { selectSelectedLanguages } from "@/slices/languages/languages-selects.ts";
import { debounce } from "lodash"

interface FormValues {
    input: string
}

/**
 * Component for rendering the user input area for translation.
 * It utilizes Formik for form handling.
 */
export const UserInput = React.memo(() => {
    const dispatch = useAppDispatch()


    const textareaRef = useRef<HTMLInputElement>();

    const { inputLanguage, responseLanguage} = useAppSelector(selectSelectedLanguages)

    // Get the search string from the location object and function that changes params
    const [searchParams, setSearchParams] = useSearchParams()

    // Get the source, target language and text from the searchParams object
    const text = searchParams.get('text')
    const sourceLanguageCode = searchParams.get("sl");
    const targetLanguageCode = searchParams.get("tl");

    /**
     * Debounce the translation request to avoid making frequent requests.
     * The translation request will be dispatched 500ms after the last input change.
     */
    const debouncedTranslate = debounce(() => {
        dispatch(requestTranslate({text, sourceLanguageCode, targetLanguageCode}));
    }, 500);

    /*
     * Change handler for the form.
     * Updates the browser URL with the new text value and triggers the translation request.
     */
    const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
        const inputValue = e.target.value

        // Update the browser URL with the new text value
        setSearchParams({
            sl: inputLanguage.code, // already set
            tl: responseLanguage.code, // already set
            text: inputValue
        })
    };


    // useEffect to update the URL searchParams whenever inputLanguage or responseLanguage changes
    useEffect(() => {
        setSearchParams({
            sl: inputLanguage.code,
            tl: responseLanguage.code,
            text: text || ''
        })
    }, [inputLanguage.code, responseLanguage.code, setSearchParams, text]);

    // useEffect to trigger the debounced translation request whenever searchParams change
    useEffect(() => {
        debouncedTranslate()
    }, [searchParams, debouncedTranslate]);

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

    return (
        <div className={s.userInput}>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({values, setFieldValue}) => (
                    <Form className={s.container} onChange={handleFormChange}>
                        <Field innerRef={textareaRef} autoFocus name='input' autoCorrect='off' className={s.input} component='textarea'/>
                        {values.input &&
                            <div className={s.clear} onClick={clear(setFieldValue)}>
                                <ClearIcon className={s.icon} sx={{color: '#606469FF'}}/>
                            </div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
})