import s from './translation.module.css'
import { DropLanguages } from "@/entities/dropLanguages/dropLanguages.tsx";
import { UserInput } from "@/entities/userInput";
import { UserOutput } from "@/entities/userOutput";
import { useAppSelector } from "@/shared/model/hooks.ts";
import { selectDropDownListState } from "@/slices/dropdownList/dropdownList-selects.ts";
import { useTranslateMutation } from "@/slices/languages/languages-api.ts";

export const TranslationBlock = () => {

    const [requestTranslate, { data, isLoading }] = useTranslateMutation()

    const { showList } = useAppSelector(selectDropDownListState)

    return (
        <div className={s.translationBlock}>
            {/* Component to display the dropdown list of available languages */}
            <DropLanguages/>
            <div className={showList ? 'hidden' : ''}>
                <div className='user-inputs'>
                    <UserInput requestTranslate={requestTranslate}/>
                    {/* Component to display the translation output */}
                    <UserOutput data={data} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}