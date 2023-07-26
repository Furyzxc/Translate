import s from './ui.module.css'
import { useAppDispatch } from "@/shared/model/hooks.ts";
import { setSourceLang, setTargetLang } from "@/slices/languages/languages-thunks.ts";
import { changeLanguageList } from "@/slices/languages/languages-slice.ts";

interface PropsType {
    code: string
    name: string
    side: 'left' | 'right'
}

export const DropLanguage = ({code, name, side}: PropsType) => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        side === 'left'
            ? dispatch(setSourceLang({code, name}))
            : dispatch(setTargetLang({code, name}))

        dispatch(changeLanguageList({code, name, side}))
    }

    return (
        <div className={s.dropLanguage} onClick={handleClick}>
            {name}
        </div>
    );
};