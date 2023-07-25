import { UserInput } from "@/entities/userInput";
import { UserOutput } from "@/entities/userOutput";
import { SelectLanguage } from "@/entities/selectLanguage";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { LanguageType, selectLangState } from "@/features/languages/languages-slice.ts";
import { SwapLanguages } from "@/entities/swapLanguages/swapLanguages.tsx";
import { requestTranslate, setSourceLang, setTargetLang } from "@/features/languages/languages-thunks.ts";
import { DropLanguages } from "@/entities/dropLanguages/dropLanguages.tsx";
import { useState } from "react";


export const App = () => {
    const dispatch = useAppDispatch()

    const {
        inputLanguage,
        responseLanguage,
        answer,
        languageList
    } = useAppSelector(selectLangState)

    const [showDropList, setShowDropList] = useState(false);
    const [dropListSide, setDropListSide] = useState<'left' | 'right'>('left');

    const setSourceLanguage = (language: LanguageType) => dispatch(setSourceLang(language))
    const setTargetLanguage = (language: LanguageType) => dispatch(setTargetLang(language))

    return (
        <div className='translation'>
            <div className='select'>
                <SelectLanguage languages={languageList.leftList} setSelectedLang={setSourceLanguage}
                                selectedLanguage={inputLanguage}
                                showLanguages={showDropList} setShowLanguages={setShowDropList}
                                setDropListSide={setDropListSide}
                                side='left'/>
                <SwapLanguages/>
                <SelectLanguage languages={languageList.rightList} setSelectedLang={setTargetLanguage}
                                selectedLanguage={responseLanguage}
                                showLanguages={showDropList} setShowLanguages={setShowDropList}
                                setDropListSide={setDropListSide}
                                side='right'/>
            </div>
            <div className='translation-block'>
                <DropLanguages showDropList={showDropList} side={dropListSide}/>
                <div className={'user-inputs' + (showDropList ? '' : ' hidden')}>
                    <UserInput/>
                    <UserOutput answer={answer} isLoading={!requestTranslate.fulfilled}/>
                </div>
            </div>
        </div>
    );
};