import s from '../userInput/input.module.css'
import { useAppSelector } from "@/shared/model/hooks.ts";
import { selectLoading, selectTranslation } from "@/slices/languages/languages-selects.ts";

export const UserOutput = () => {
    const answer = useAppSelector(selectTranslation)
    const isLoading = useAppSelector(selectLoading)

    return (
        <div className={s.container} style={{backgroundColor: '#F2F2F2'}}>
            <div className={s.input}>
                {answer ||
                    <span style={{color: '#5F6368FF'}}>Translate</span>}
                {isLoading && '...'}

            </div>
        </div>
    );
};