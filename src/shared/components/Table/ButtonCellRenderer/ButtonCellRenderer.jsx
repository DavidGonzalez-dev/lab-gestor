import styles from "./ButtonCellRenderer.module.css"
import { Button } from "@shared/components";

export const ButtonCellRenderer = (props) => {

    // Desestrucutramos las props
    const { variant = "", icon: Icon, parentMethod } = props

    // Funcion para manejar el parentMethod
    const handleClick = (e) => {
        //Prevenir que el click se propague a las demas filas
        e.stopPropagation()

        // Si hay un metodo padre se ejecuta
        if (parentMethod) {
            parentMethod()
        }
    }

    return (
        <div className={styles.buttonCellContainer}>
            <Button
                variant={variant}
                parentMethod={handleClick}
            >
                {Icon && <Icon />}
            </Button>
        </div>
    )

}