import s from './ui.module.css'

interface LanguageProps {
    selected: boolean
    name: string // English
}

export const Language = ({selected, name}: LanguageProps) => {

    const clsses = [s.button, selected ? s.selected : s.hidden ]

    return (
        <button className={clsses.join(' ')}>
            <span className={s.language}>
            {name}
            </span>
        </button>
    )
};