import styles from "./SelectButton.module.css"

export const SelectButton = ({variant, selected, parentMethod, children}) => {
    return (
        <button type="button" className={`${styles.selectButton} ${styles[variant]} ${selected ? styles.selected : ""}`} onClick={parentMethod}>
            {children}
        </button>
    )
}