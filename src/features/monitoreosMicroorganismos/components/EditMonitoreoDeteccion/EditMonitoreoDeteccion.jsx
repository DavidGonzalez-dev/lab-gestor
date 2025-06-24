import { useForm } from "react-hook-form"

import { Button, Input, CustomSelect, LoaderSpiner } from "@shared/components"
import { CheckIcon, TrashIcon } from "@shared/iconos"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { UpdateMonitoreoDeteccion } from "../../services"
import { useState } from "react"
import { toLocalISOString } from "@shared/utils"

import styles from "./EditMonitoreoDeteccion.module.css"

const etapasDeteccion = [
    {
        value: 1,
        label: "Incubacion Previa 30-35°C"
    },
    {
        value: 2,
        label: "Seleccion 42-44°C"
    },
    {
        value: 3,
        label: "Subcultivo 30-35°C"
    },
]


export const EditMonitoreoDeteccion = ({ onCancel, initialValues }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            ...initialValues,
            fechayhoraInicio: initialValues.fechayhoraInicio.slice(0, 16),
            fechayhoraFinal: initialValues.fechayhoraFinal.slice(0, 16)
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    const fechaHoraInicio = watch("fechayhoraInicio")

    // Funcion que maneja el envio de datos
    const onSubmit = async (data) => {
        const payload = {
            ...data,
            idEtapaDeteccion: parseInt(data.idEtapaDeteccion),
            fechayhoraInicio: toLocalISOString(data.fechayhoraInicio),
            fechayhoraFinal: toLocalISOString(data.fechayhoraFinal),
        }

        try {
            setIsLoading(true)

            const success = await UpdateMonitoreoDeteccion(initialValues.id, payload)
            if (success) {
                SuccessAlert.fire({
                    title: "Registro actualizado con exito!"
                }).then(() => window.location.reload())
            }

        } catch (error) {
            ErrorAlert.fire({
                title: "Hubo un error al actualizar el registro",
                text: error.message,
            })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                <div className={styles.inputGroup}>

                    <div className="row">
                        <div className="col-lg-6">
                            {/* Volumen de Muestra */}
                            <Input
                                type="text"
                                id="volumenMuestra"
                                placeholder="Ej: 10mg"
                                label="Volumen de Muestra"
                                error={errors.volumenMuestra}
                                {...register("volumenMuestra", {
                                    required: "Este campo es obligatorio*"
                                })}
                            />
                        </div>
                        <div className="col-lg-6">
                            <CustomSelect
                                label="Etapa de Deteccion"
                                id="idEtapaDeteccion"
                                error={errors.idEtapaDeteccion}
                                options={etapasDeteccion}
                                {...register("idEtapaDeteccion", {
                                    required: "Seleccione un opcion valida*"
                                })}
                            />
                        </div>
                    </div>

                    {/* Volumen de Muestra */}
                    <Input
                        type="text"
                        id="nombreDiluyente"
                        placeholder="Ej: Agua Esteril"
                        label="Nombre del Diluyente"
                        error={errors.nombreDiluyente}
                        {...register("nombreDiluyente", {
                            required: "Este campo es obligatorio*"
                        })}
                    />
                    <div className="row">


                        <div className="col-lg-6">

                            {/* FechayHoraInicio */}
                            <Input
                                type="datetime-local"
                                label="Fecha y Hora de Inicio"
                                id="fechayhoraInicio"
                                {...register("fechayhoraInicio", { required: "Este campo es obligatorio*" })}
                                error={errors.fechayhoraInicio}
                            />

                        </div>

                        <div className="col-lg-6">

                            {/* FechayHoraInicio */}
                            <Input
                                type="datetime-local"
                                label="Fecha y Hora de Incubación"
                                id="fechayhoraFinal"
                                {...register("fechayhoraFinal", {
                                    required: "Este campo es obligatorio*",
                                    validate: value => !fechaHoraInicio || new Date(value) > new Date(fechaHoraInicio) || "La fecha de final debe ser mayor a la fecha de inicio*"
                                })}
                                error={errors.fechayhoraFinal}
                            />

                        </div>

                    </div>

                </div>

                <div className={styles.buttonGroup}>
                    <Button variant="buttonCancel" parentMethod={onCancel}>
                        Cancelar
                        <TrashIcon />
                    </Button>
                    <Button type="submit" variant="buttonAccept" disabled={isLoading}>
                        {isLoading ? <LoaderSpiner /> : <>Actualizar <CheckIcon /></>}
                    </Button>
                </div>
            </form>
        </>
    )

}