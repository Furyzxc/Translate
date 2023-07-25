import s from './swap.module.css'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { selectLangState, swapLanguages } from "@/features/languages/languages-slice.ts";

export const SwapLanguages = () => {
    const dispatch = useAppDispatch()
    const { inputLanguage, responseLanguage} = useAppSelector(selectLangState)

    const handleClick = () => {
        dispatch(
            swapLanguages({
                inputLanguage, responseLanguage
            }))
    }
    return (
        <div className={s.swap} onClick={handleClick}>
            <SwapHorizIcon className={s.icon} sx={{color: '#5F6368FF'}}/>
        </div>
    );
};