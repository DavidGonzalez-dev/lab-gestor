import styles from "./RegistroControlNegativo.module.css";

import { Input, Button, LoaderSpiner } from "@shared/components"
import { CheckIcon, TrashIcon } from "@shared/iconos"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { useForm } from "react-hook-form";
import { RegistrarControlNegativo } from "../../services";
import { useState } from "react";

export const RegistroControlNegativo = ({ onClose, numeroRegistroProducto }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const fechayhoraIncubacion = watch("fechayhoraIncubacion")

    const onSubmit = async (data) => {

        const payload = {
            ...data,
            numeroRegistroProducto: numeroRegistroProducto,
        }
        
        const fechayhoraLecturaLocal = new Date(data.fechayhoraLectura).toISOString();
        const fechayhoraIncubacionLocal = new Date(data.fechayhoraIncubacion).toISOString();
        payload.fechayhoraIncubacion = fechayhoraIncubacionLocal;
        payload.fechayhoraLectura = fechayhoraLecturaLocal;

        console.log(payload)

        try {
            setIsLoading(true)
            const success = await RegistrarControlNegativo(payload)
            if (success) {

                SuccessAlert.fire({
                    title: "El control negativo se registro con exito!"
                }).then(() => window.location.reload())
            }

        } catch (error) {
            ErrorAlert.fire({
                title: "Ups! hubo un error",
                text: error.message
            })
        } finally {
            setIsLoading(false)
        }

    };

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
                            {...register("fechayhoraLectura", { required: "Este campo es obligatorio*",
                                validate: (value) => !fechayhoraIncubacion || new Date(value) > new Date(fechayhoraIncubacion) || "La fecha de lectura debe ser mayor a la fecha de incubacion*"
                             })}
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
    );
};
