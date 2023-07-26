import s from './drop.module.css'
import { Field, Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "@/shared/model/hooks.ts";
import { DropLanguage } from "@/shared/ui/dropLanguage.tsx";
import { selectAvailableLanguages } from "@/slices/languages/languages-selects.ts";
import { selectDropDownListState } from "@/slices/dropdownList/dropdownList-selects.ts";

/**
 * Component for displaying a drop-down list of available languages.
 * The list can be filtered based on a search term provided by the user.
 *
 * @returns {JSX.Element | null} The JSX element representing the DropLanguages component, or null if showList is false.
 */
export const DropLanguages = () => {
    // whole list of languages
    const languages = useAppSelector(selectAvailableLanguages)

    const { showList, side } = useAppSelector(selectDropDownListState)

    // State to store the search term for filtering languages
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Handler for input change in the search bar.
     * Updates the search term state with the input value.
     */
    const handleInputChange = (e: ChangeEvent<HTMLFormElement>) => setSearchTerm(e.target.value)

    // filtration by search term, used toLowercase to equalize language name with term
    const filteredLanguages = languages.filter((language) => {
        return language.name.toLowerCase().includes(searchTerm.toLowerCase())
    });

    // Render the component only if showDropList is true
    if (showList) {
        return (
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
        )
    } else {
        // Return null if showList is false (component is not rendered)
        return null;
    }
};