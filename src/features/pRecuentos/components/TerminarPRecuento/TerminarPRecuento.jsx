import { UpdateEstadoPrueba } from "../../services";

import { Button } from "@shared/components";
import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

export const TerminarPRecento = ({ recuento }) => {

    const handleClick = () => {

        ConfirmAlert.fire({
            title: "¿Seguro que quieres terminar este analisis?"
        }).then(async result => {

            if (result.isConfirmed) {
                try {
                    const success = await UpdateEstadoPrueba(recuento.id, {estado: "terminado"})
                    if (success) {
                        SuccessAlert.fire({
                            title: "Recuento terminado con exito!",
                            text: "Aunque este recuento tenga un estado de terminad puedo editar su informacion"
                        }).then(() => window.location.href = `/productos/${recuento.numeroRegistroProducto}`)
                    }
                } catch (error) {
                    ErrorAlert.fire({
                        title: "Hubo un error al actualizar el recuento",
                        text: error.message
                    })
                }
            }
        })

    }

    return (
        <Button parentMethod={handleClick}>
            Terminar Prueba
        </Button>
    )
}