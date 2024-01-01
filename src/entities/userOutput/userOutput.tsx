import s from '../userInput/input.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from "usehooks-ts";
import { useEffect, useState } from "react";
import { TranslateResponseBody } from "@/shared/api/types.ts";

type PropsType = {
    data: undefined | TranslateResponseBody
    isLoading: boolean
}
/**
 * Component for displaying the translation output and providing
 * the ability to copy the translation to the clipboard.
 */
export const UserOutput = ({data, isLoading}: PropsType) => {
    const [, copy] = useCopyToClipboard()
    const translatedText = data?.data.translatedText || ''

    const [answer, setAnswer] = useState(data?.data.translatedText || '')

    useEffect(() => {
        data !== undefined && setAnswer(translatedText)
    }, [data, translatedText]);

    return (
        <div className={s.container} style={{backgroundColor: '#F2F2F2'}}>
            {/* The translation output */}
            <div className={s.input}>
                {answer ||
                    <span style={{color: '#5F6368FF'}}>Translate</span> && isLoading && '...'}
            </div>
            {answer &&
                // Copy icon, visible only when there is a translation
                <div className={s.copy} onClick={() => copy(answer)}>
                    <ContentCopyIcon/>
                </div>
            }
        </div>
    );
};