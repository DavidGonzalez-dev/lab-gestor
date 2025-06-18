import styles from "./ResetPasswordForm.module.css"

import { useForm } from "react-hook-form"
import usePasswordResetStore from "@shared/stores/usePasswordResetStore"
import { CheckIcon, TrashIcon } from "@shared/iconos"

import { Input, Button, LoaderSpiner, CustomCheckBox } from "@shared/components"
import { resetPassword } from "../../services"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"
import { useState } from "react"

export const ResetPasswordForm = () => {

    const { userEmail } = usePasswordResetStore() // Obtenemos el emial del usuario
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [isLoading, setIsLoading] = useState(false) // Estado para manejar el loading
    const [showPassword, setShowPassword] = useState(false) // Estado para mostrar/ocultar la contraseña

    // Guardamos la contraseña enm una variable con el fin de compararla con la confirmacion de contraseña
    const password = watch("contrasena")

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    // Funcion para envio de datos  
    const onSubmit = async (data) => {
        const payload = {
            correoUsuario: userEmail,
            contrasena: data.confirmacionContrasena
        }

        try {
            setIsLoading(true)
            const success = await resetPassword(payload)
            if (success) {
                SuccessAlert.fire({
                    title: "Se cambio la contraseña con exito!",
                    text: "Ahora puedes iniciar sesion con tun nueva contraseña",
                    confirmButtonText: "Iniciar Sesion"
                }).then((result) => {
                    if (result.isConfirmed) window.location.href = "/login"
                })
            }
        } catch (error) {
            ErrorAlert.fire({
                title: "!Ups, algo salio mal.",
                html: error.message,
                confirmButtonText: "Generar Codigo de Verificacion",
            }).then((result) => {
                if (result.isConfirmed) window.location.href = "/recuperacion-contraseña"
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputContainer}>
                <Input
                    id="contrasena"
                    type={showPassword ? "text" : "password"}
                    error={errors.contrasena}
                    placeholder="Ingresa tu nueva contraseña"
                    label="Nueva Contraseña"
                    {...register("contrasena", {
                        required: "Introduce una contraseña para continuar*",
                        validate: {
                            hasUpperCase: value =>
                                /[A-Z]/.test(value) || "Debe contener al menos una letra mayúscula*",
                            hasLowerCase: value =>
                                /[a-z]/.test(value) || "Debe contener al menos una letra minúscula*",
                            hasNumber: value =>
                                /\d/.test(value) || "Debe contener al menos un número*",
                            hasSpecialChar: value =>
                                /[^A-Za-z0-9]/.test(value) || "Debe contener un carácter especial*"
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres*"
                        }
                    })}
                />

                <Input
                    id="confirmacionContrasena"
                    type={showPassword ? "text" : "password"}
                    error={errors.confirmacionContrasena}
                    placeholder="Confirma tu contraseña"
                    label="Confirma tu Contraseña"
                    {...register("confirmacionContrasena", {
                        required: "Confirma tu nueva contraseña*",
                        validate: (value) => value === password || "Las contraseñas no coinciden*"
                    })}
                />

                <CustomCheckBox
                    label={"Mostrar contraseña"}
                    name={"rememberMe"}
                    id={"rememberMe"}
                    onChange={togglePasswordVisibility}
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button variant="buttonCancel" parentMethod={() => window.location.href = "/recuperacion-contraseña/verificacion"}>
                    Cancelar
                    <TrashIcon />
                </Button>

                <Button type="submit" variant="buttonAccept" disabled={isLoading}>
                    {isLoading ? <LoaderSpiner /> : <>Confirmar <CheckIcon /></>}
                </Button>
            </div>
        </form>
    )

}