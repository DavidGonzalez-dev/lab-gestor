import styles from "./FormularioRegistroResultado.module.css"

import { useForm } from "react-hook-form"

import { Button, Input } from "@shared/components"
import { TrashIcon, CheckIcon } from "@shared/iconos"
import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { ActualizarResultadoOrganismo } from "../../services"
import { useState } from "react"

export const FormularioRegistroResultado = ({ idDeteccion, onCancel }) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)

    // Logica de envio de datos
    const onSubmit = async (data) => {

        ConfirmAlert.fire({
            title: "¿Estas seguro de registrar el analisis de este producto?",
            text: "Una vez registres el resultado de este analisis no podras cambiarlo"
        })
            .then(async result => {

                if (result.isConfirmed) {

                    try {
                        const success = await ActualizarResultadoOrganismo(idDeteccion, data)
                        if (success) {
                            SuccessAlert.fire({
                                title: "Resultado de analisis actualizado con exito"
                            }).then(() => window.location.reload())
                        }
                    } catch (error) {
                        ErrorAlert.fire({
                            title: "Hubo un problema al actualizar el resultado",
                            text: error.mesage
                        })
                    }
                }
            })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="resultado"
                type="text"
                label="Resultado"
                placeholder="Ingrese el resultado"
                error={errors.resultado}
                {...register("resultado", {
                    required: "Este campo es obligatorio*"
                })}
            />

            <div className={styles.buttonGroup}>
                <Button variant="buttonCancel" parentMethod={onCancel}>
                    Cancelar
                    <TrashIcon />
                </Button>
                <Button variant="buttonAccept" type="submit" disabled={isLoading}>
                    Guardar
                    <CheckIcon />
                </Button>
            </div>
        </form>
    )
}