import s from './swap.module.css'
import React from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { swapLanguages } from "@/slices/languages/languages-slice.ts";
import { selectSelectedLanguages } from "@/slices/languages/languages-selects.ts";

export const SwapLanguages = React.memo(() => {
    const dispatch = useAppDispatch()
    const { inputLanguage, responseLanguage} = useAppSelector(selectSelectedLanguages)

    // callback that swaps the languages after click on icon
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
})