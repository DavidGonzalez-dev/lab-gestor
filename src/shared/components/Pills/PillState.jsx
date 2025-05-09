import styles from "./Pill.module.css"

export const PillState = (params) => {
    return(
        <span className={`${styles.pill} ${styles[params.variant]}`}>{params.value === true ? "activo" : "inactivo"}</span>
    )
}