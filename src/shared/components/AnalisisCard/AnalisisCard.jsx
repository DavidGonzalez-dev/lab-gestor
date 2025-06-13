import styles from "./AnalisisCard.module.css"
import { Button, PillType } from "@shared/components"


export const AnalisisCard = ({ title, status, redirectFunction, typeVariant, children }) => {


    return (
        <article className={styles.cardContainer}>
            <h4 className={styles.title}>
                {title}
            </h4>
            <div className={`${styles.cardContent} ${styles[typeVariant]}`}>
                {children}
            </div>
            <div className={styles.footer}>
                <Button parentMethod={redirectFunction}>
                    Ver mas...
                </Button>
                <PillType value={status} variant={status === "pendiente" || status === "fallido" ? "red" : "green"}/>
            </div>
        </article>
    )
}