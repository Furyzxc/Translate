import { Language } from "../../shared/ui/language.tsx";
import s from './select.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LanguageType } from "@/slices/languages/languages-slice.ts";
import { setDropdownSide, toggleShowList } from "@/slices/dropdownList/dropdownList-slice.ts";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { selectDropDownListState } from "@/slices/dropdownList/dropdownList-selects.ts";
import { setSourceLang, setTargetLang } from "@/slices/languages/languages-thunks.ts";
import { selectLanguagesLists, selectSelectedLanguages } from "@/slices/languages/languages-selects.ts";

interface PropsType {
    side: 'right' | 'left'
}

/**
 * Component for selecting a language from a menu above the inputs.
 * The selected language is highlighted in the list.
 * It displays a list of 3 languages with an arrow icon to toggle the visibility of the dropdown list.
 */
export const SelectLanguage = ({side}: PropsType) => {
    const dispatch = useAppDispatch();

    const {showList} = useAppSelector(selectDropDownListState);

    // Select languages and selected language based on the side prop
    const { leftList, rightList} = useAppSelector(selectLanguagesLists);
    const { inputLanguage, responseLanguage} = useAppSelector(selectSelectedLanguages);

    const languages = side === "left" ? leftList : rightList;
    const selectedLanguage = side === 'left' ? inputLanguage : responseLanguage;

    /**
     * Callback function to handle the click event on a language button.
     * Dispatches an action to set the source or target language based on the side.
     */
    const handleBtnClick = (language: LanguageType) => () => {
        if (side === 'left') {
            dispatch(setSourceLang(language))
        }
        if (side === 'right') {
            dispatch(setTargetLang(language));
        }
    }

    const iconClasses = `${s.arrow} ${showList ? s.up : s.down}`;

    /**
     * Callback function to handle the click event on the drop-down icon.
     * Toggles the visibility of the drop-down list of languages and sets the side which dropdown list refers.
     */
    const handleArrowClick = () => {
        dispatch(toggleShowList())
        dispatch(setDropdownSide(side))
    }

    return (
        <div className={s.selectLanguage}>
            {languages.map((language, index) =>
                (<div onClick={handleBtnClick(language)} key={index}>
                    <Language selected={language.code === selectedLanguage?.code} {...language} />
                </div>))}
            <div className={iconClasses} onClick={handleArrowClick}>
                <KeyboardArrowDownIcon sx={{color: '#606469'}}/>
            </div>
        </div>
    )
}