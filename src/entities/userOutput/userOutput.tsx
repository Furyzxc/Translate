import s from '../userInput/input.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppSelector, useCopyText } from "@/shared/model/hooks.ts";
import { selectLoading, selectTranslation } from "@/slices/languages/languages-selects.ts";

/**
 * Component for displaying the translation output and providing
 * the ability to copy the translation to the clipboard.
 */
export const UserOutput = () => {
    const answer = useAppSelector(selectTranslation)
    const isLoading = useAppSelector(selectLoading)

    // Custom hook to enable copying text to clipboard
    const {textRef, copyText} = useCopyText()

    return (
        <div className={s.container} style={{backgroundColor: '#F2F2F2'}}>
            {/* The translation output */}
            <div className={s.input} ref={textRef}>
                {answer ||
                    <span style={{color: '#5F6368FF'}}>Translate</span> && isLoading && '...'}
            </div>
            {answer &&
                // Copy icon, visible only when there is a translation
                <div className={s.copy} onClick={copyText}>
                    <ContentCopyIcon/>
                </div>
            }
        </div>
    );
};