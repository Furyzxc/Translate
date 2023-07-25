import { Language } from "../../shared/ui/language.tsx";
import s from './select.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LanguageType } from "@/features/languages/languages-slice.ts";

interface PropsType {
    languages: LanguageType[]

    selectedLanguage: LanguageType | undefined
    setSelectedLang: (language: LanguageType) => void

    // for drop list of languages
    showLanguages: boolean
    setShowLanguages: any

    setDropListSide: any
    side: 'right' | 'left'
}

export const SelectLanguage = ({
                                   side,
                                   setDropListSide,
                                   languages,
                                   selectedLanguage,
                                   setSelectedLang,
                                   showLanguages,
                                   setShowLanguages
                               }: PropsType) => {
    const handleBtnClick = (language: LanguageType) => () => {
        setSelectedLang(language)
    }

    const iconClsses = [s.arrow, showLanguages ? s.up : s.down]

    const handleArrowClick = () => {
        setShowLanguages((prev: boolean) => !prev)
        setDropListSide(side)
    }

    return (
        <div className={s.selectLanguage}>
            {languages.map((language, index) =>
                (<div onClick={handleBtnClick(language)} key={index}>
                    <Language selected={language.code === selectedLanguage?.code} {...language} />
                </div>))}
            <div className={iconClsses.join(' ')} onClick={handleArrowClick}>
                <KeyboardArrowDownIcon sx={{color: '#606469'}}/>
            </div>
        </div>
    );
};