import s from './input.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import { memo } from "react";
import { Field, Form, Formik } from "formik";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { TranslateResponseBody } from "@/shared/api/types.ts";
import { useUserInput } from "@/entities/userInput/useUserInput.ts";


type PropsType = {
    requestTranslate: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>, never, TranslateResponseBody, "baseApi">>
}

/**
 * Component for rendering the user input area for translation.
 * It utilizes Formik for form handling.
 */
export const UserInput = memo(({requestTranslate}: PropsType) => {
    const { textareaRef, initialValues, handleFormChange, clear} = useUserInput(requestTranslate)

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