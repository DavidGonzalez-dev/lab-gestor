import styles from "./EditControlNegativo.module.css"

import { useForm } from "react-hook-form"

import { Input, Button, LoaderSpiner } from "@shared/components"
import { TrashIcon, CheckIcon } from "@shared/iconos"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { UpdateControlNegativo } from "../../services"
import { useState } from "react"

export const EditControlNegativo = ({ initialValues, onClose }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...initialValues,
            fechayhoraIncubacion: initialValues.fechayhoraIncubacion.slice(0, 16),
            fechayhoraLectura: initialValues.fechayhoraLectura.slice(0, 16),
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {

        const payload = {
            ...data,
            fechayhoraLectura: new Date(data.fechayhoraLectura).toISOString(),
            fechayhoraIncubacion: new Date(data.fechayhoraIncubacion).toISOString(),
        }

        try {
            setIsLoading(true)
            const success = await UpdateControlNegativo(payload)

            if (success) {
                SuccessAlert.fire({
                    title: "Registro actualizado con exito"
                }).then(() => window.location.reload())
            }

        } catch (error) {

            ErrorAlert.fire({
                title: "Hubo un error al actualizar el registro",
                text: error.message
            })

        } finally {
            setIsLoading(false)
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>

                {/* Medio de Cultivo */}
                <Input
                    type="text"
                    label="Medio de Cultivo"
                    id="medioCultivo"
                    placeHolder="Ingrese el medio de cultivo"
                    {...register("medioCultivo", {
                        required: "Este campo es obligatorio*",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "Solo se permiten letras y números*"
                        },
                    })}
                    error={errors.medioCultivo}
                />

                <div className="row">
                    <div className="col-lg-6">
                        {/* Fecha y Hora de Incubacion */}
                        <Input
                            type="datetime-local"
                            label="Fecha y Hora de Incubación"
                            id="fechayhoraIncubacion"
                            {...register("fechayhoraIncubacion", { required: "Este campo es obligatorio*" })}
                            error={errors.fechayhoraIncubacion}
                        />
                    </div>

                    <div className="col-lg-6">
                        {/* Fecha y Hora de Lectura */}
                        <Input
                            type="datetime-local"
                            label="Fecha y Hora de Lectura"
                            id="fechayhoraLectura"
                            {...register("fechayhoraLectura", { required: "Este campo es obligatorio*" })}
                            error={errors.fechayhoraLectura}
                        />
                    </div>
                </div>



                {/* Resultado */}
                <Input
                    type="text"
                    label="Resultado"
                    id="resultado"
                    placeHolder="Ingrese el resultado"
                    {...register("resultado", { required: "Este campo es obligatorio*" })}
                    error={errors.resultado}
                />
            </div>

            <div className={styles.buttonGroup}>
                <Button parentMethod={onClose} variant="buttonCancel">
                    Cancelar
                    <TrashIcon />
                </Button>

                <Button type="submit" variant="buttonAccept" disabled={isLoading}>
                    {isLoading
                        ? (
                            <LoaderSpiner />
                        )
                        : (
                            <>
                                Registrar
                                <CheckIcon />
                            </>
                        )}

                </Button>
            </div>
        </form >
    )
}