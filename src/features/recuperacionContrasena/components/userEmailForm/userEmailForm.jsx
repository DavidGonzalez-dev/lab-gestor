import styles from "./userEmailForm.module.css"

import { Input, Button } from "@shared/components"
import { CheckIcon, ArrowBackIcon } from "@shared/iconos"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { useForm } from "react-hook-form"
import usePasswordResetStore from "@shared/stores/usePasswordResetStore"

export const UserEmailForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { sendVerificationCode } = usePasswordResetStore()

    // Funcion para manejar el envio de datos
    const onSubmit = async (data) => {
        try {
            const success = await sendVerificationCode(data)
            if (success) {
                SuccessAlert.fire({
                    title: "Correo enviado con exito!",
                    text: "Revisa tu correo, te enviamos un codigo de verificacion para hacer el cambio de contraseña, si no lo ves en tu bandeja de entrada revisa la carpeta de spam!"
                })
            }
        } catch (error) {
            ErrorAlert.fire({
                title: "Ups! Hubo un error.",
                text: error.message
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <Input
                id="correo"
                type="email"
                label="Correo Electronico"
                placeHolder="Ej: ejemplo@email.com"
                error={errors.correo}
                {...register("correo", {
                    required: "Por favor ingrese un correo para continuar*",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Ingrese una direccion de correo valida*"
                    }
                })}
            />

            <div className={styles.buttonsContainer}>

                <Button variant="buttonCancel" parentMethod={() => window.location.href = "/login"}>
                    Cancelar
                    <ArrowBackIcon />
                </Button>

                <Button type="submit" variant="buttonAccept">
                    Enviar
                    <CheckIcon />
                </Button>
            </div>
        </form>
    )
}