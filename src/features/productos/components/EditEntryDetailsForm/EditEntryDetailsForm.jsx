import styles from "./EditEntryDetailsForm.module.css"

import { Input, CustomTextArea, Button, LoaderSpiner } from "@shared/components"
import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/Alerts"
import { TrashIcon, CheckIcon } from "@shared/iconos"

import { UpdateEntryDetails } from "../../services"

import { useForm } from "react-hook-form"
import { useState } from "react"


export const EditEntryDetailsForm = ({ initialValues, closeModal }) => {
    const formattedDefaultValues = {
        ...initialValues,
        fechaRecepcion: initialValues.fechaRecepcion ? new Date(initialValues.fechaRecepcion).toISOString().split('T')[0] : '',
        fechaInicioAnalisis: initialValues.fechaInicioAnalisis ? new Date(initialValues.fechaInicioAnalisis).toISOString().split('T')[0] : '',
        fechaFinalAnalisis: initialValues.fechaFinalAnalisis ? new Date(initialValues.fechaFinalAnalisis).toISOString().split('T')[0] : '',
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: formattedDefaultValues
    })

    const [isLoading, setIsLoading] = useState(false)

    // Guardamos los datos que necesitemos para hacer validaciones en los demas campos
    const fechaRecepcion = new Date(watch("fechaRecepcion"))


    // Funcion para manejar la logica de envio de datos
    const onSubmit = (payload) => {
        ConfirmAlert.fire({
            title: "Seguro que quiere actualizar los detalles de entrada de este producto?",
            text: "Es posible que estos cambios afecten la informacion de otros registros relacionados a este producto"
        })
            .then(async (result) => {

                if (result.isConfirmed) {

                    try {
                        setIsLoading(true)
                        const success = await UpdateEntryDetails(initialValues.numeroRegistroProducto, payload)

                        if (success) {
                            SuccessAlert.fire({
                                title: "Se actualizaron los detalles de entrada con exito!"
                            }).then(() => location.reload())
                        }
                    } catch (error) {
                        ErrorAlert.fire({
                            title: "Ups! Hubo un error",
                            text: error.message
                        })
                    } finally {
                        setIsLoading(false)
                    }
                }

            })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputContainer}>
                {/* Proposito de analisis  */}
                <CustomTextArea
                    id="propositoAnalisis"
                    label="Proposito de Analisis"
                    placeHolder="Ej: Analisis para veficacion..."
                    error={errors.propositoAnalisis}
                    {...register("propositoAnalisis", {
                        required: "El proposito de analisis no puede estar vacio*",
                    })}
                />

                {/* Condiciones ambientales */}
                <Input
                    id="condicionesAmbientales"
                    type="text"
                    label="Condiciones Ambientales"
                    placeHolder="Ej: Temperatura Ambiente"
                    error={errors.condicionesAmbientales}
                    {...register("condicionesAmbientales", {
                        required: "Las condiciones ambientales no pueden estar vacias*"
                    })}
                />
                <div className="d-flex gap-3">
                    {/* Fecha Recepcion */}
                    <Input
                        id="fechaRecepcion"
                        type="date"
                        label="Fecha de Recepcion"
                        error={errors.fechaRecepcion}
                        {...register("fechaRecepcion", {
                            required: "La fecha de recepcion no puede estar vacia*"
                        })}
                    />

                    {/* Fecha Inicio de Analisis */}
                    <Input
                        id="fechaInicioAnalisis"
                        type="date"
                        label="Fecha de Inicio de Analisis"
                        error={errors.fechaInicioAnalisis}
                        {...register("fechaInicioAnalisis", {
                            required: "La fecha de inicio de analisis no puede estar vacia*",
                            validate: (value) => !fechaRecepcion || new Date(value) >= fechaRecepcion || "La fecha de inicio de analisis tiene que ser mayor a la fecha de recepcion*"
                        })}
                    />
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button variant="buttonCancel" parentMethod={closeModal}>
                    Cancelar
                    <TrashIcon />
                </Button>

                <Button variant="buttonAccept" type="submit" disabled={isLoading}>
                    {isLoading
                        ? <LoaderSpiner />
                        : <>Aceptar<CheckIcon /></>}

                </Button>
            </div>
        </form>
    )
}