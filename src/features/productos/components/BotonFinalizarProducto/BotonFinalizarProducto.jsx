import { Button } from "@shared/components"
import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { UpdateProductStatus } from "../../services"

export const BotonFinalizarProducto = ({ numeroRegistro }) => {
    console.log(numeroRegistro)
    const handleClick = () => {
        
        ConfirmAlert.fire({
            title: "¿Esta seguro de querer terminar de analizar el producto?",
            text: "Una vez el producto tenga estado de terminado no se podran registrar nuevos analisis solo modificar los existentes"
        })
        .then(async result => {

            if (result.isConfirmed) {
                try {
                    const success = await UpdateProductStatus(numeroRegistro, {idEstado: 3})
                    if (success) {
                        SuccessAlert.fire({
                            title: "Has terminado el analisis del producto felicidades!"
                        }).then(() => window.location.reload())
                    }

                } catch (error) {
                    ErrorAlert.fire({
                        title: "Hubo un error al actualizar el estado del producto",
                        text: error.message
                    })
                }
            }
        })
    }

    return (
        <Button parentMethod={handleClick}>
            TerminarAnalisis
        </Button>
    )
}