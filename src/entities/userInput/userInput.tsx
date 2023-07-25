import { Field, Form, Formik } from "formik";
import { formikInit } from "./formik-init.ts";
import s from './input.module.css'
import { useAppDispatch } from "@/shared/model/hooks.ts";
import { requestTranslate } from "@/features/languages/languages-thunks.ts";
import { FocusEvent } from "react";
import ClearIcon from '@mui/icons-material/Clear';

export const UserInput = () => {
    const dispatch = useAppDispatch()

    const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
        dispatch(requestTranslate(e.target.value))
    }

    const clear = (resetForm: any) => () => resetForm()


    return (
        <div className={s.userInput}>
            <Formik initialValues={formikInit.initialValues} onSubmit={formikInit.handleSubmit}>
                {({values, resetForm}) => (
                    <Form className={s.container} onBlur={handleBlur}>
                        <Field autoFocus name='input' autoCorrect='off' className={s.input} component='textarea'/>
                        {values.input &&
                            <div className={s.clear} onClick={clear(resetForm)}>
                                <ClearIcon className={s.icon} sx={{color: '#606469FF'}}/>
                            </div>}
                            </Form>
                            )}
                    </Formik>
                    </div>
                    );
                };