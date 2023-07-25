import s from './drop.module.css'
import { useAppSelector } from "@/shared/model/hooks.ts";
import { selectLangState } from "@/features/languages/languages-slice.ts";
import { DropLanguage } from "@/shared/ui/dropLanguage.tsx";
import { Field, Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";

interface PropsType {
    showDropList: boolean
    side: 'right' | 'left'
}

export const DropLanguages = ({showDropList, side}: PropsType) => {
    const {languages} = useAppSelector(selectLangState)

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLFormElement>) => setSearchTerm(e.target.value)

    // filtration by search term, used toLowercase to equalize name with term

    const filteredLanguages = languages.filter((language) => {
        return language.name.toLowerCase().includes(searchTerm.toLowerCase())
    });

    if (showDropList) return (
        <div className={s.container}>
            <Formik initialValues={{input: ''}} onSubmit={() => {}}>
                <Form className={s.search} onChange={handleInputChange}>
                    <Field name='input' className={s.input} autoCorrect='off'
                           placeholder='Search Languages'/>
                </Form>
            </Formik>
            <div className={s.wrapper}>
                <div className={s.drop}>
                    {filteredLanguages.map(language => <DropLanguage key={language.code} side={side} {...language} />)}
                </div>
            </div>
        </div>
    );
};