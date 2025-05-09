import styles from "./Pill.module.css"

export const PillType = (params) => {
    return(
        <span className={`${styles.pill} ${styles[params.variant]}`}>{params.value}</span>
    )
}