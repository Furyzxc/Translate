import s from '../userInput/input.module.css'

interface PropsType {
    answer: null | string
    isLoading: boolean
}

export const UserOutput = ({answer, isLoading}: PropsType) => {
    return (
        <div className={s.container}>
            <div className={s.input}>
                {isLoading ? '...' : answer ||
                    <span style={{color: '#5F6368FF'}}>Translate</span>}
            </div>
        </div>
    );
};