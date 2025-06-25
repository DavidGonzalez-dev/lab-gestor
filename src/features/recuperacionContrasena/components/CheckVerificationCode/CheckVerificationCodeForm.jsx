import styles from "./CheckVerificationCodeForm.module.css"

import { CodeInput, Button, LoaderSpiner } from "@shared/components"
import { CheckIcon } from "@shared/iconos"
import { SuccessAlert, ErrorAlert } from "@shared/components/Alerts"

import { useForm } from "react-hook-form"
import usePasswordResetStore from "@shared/stores/usePasswordResetStore"
import { validateVerificationToke } from "../../services"
import { useState } from "react"


export const CheckVerificationCodeForm = () => {

    const { handleSubmit, formState: { errors }, control } = useForm()
    const { userEmail } = usePasswordResetStore()
    const [isLoading, setIsLoading] = useState(false) // Estado para manejar el loading

    console.log(errors.codigoVerificacion)
    // Funcion para manejar el envio de datos
    const onSumbit = async (data) => {
        let payload ={
            correoUsuario: userEmail,
            codigoVerificacion: data.codigoVerificacion
        }
        console.log(payload)
        try {
            setIsLoading(true)
            const success = await validateVerificationToke(payload)
            if (success){
                SuccessAlert.fire({
                    title: "Todo parece correcto!",
                    text: "Tu codigo fue validado correctamente. Ahora puedes cambiar tu contraseña sin ningun problema"
                }).then(() => {window.location.href = "/recuperacionContrasena/nueva"})
            }
            
        } catch (error) {
            ErrorAlert.fire({
                title: "Ups! Algo salio mal",
                text: error.message
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <form onSubmit={handleSubmit(onSumbit)} className={styles.verificationCodeContainer}>
            <CodeInput
                length={6}
                label="Ingresa el Codigo:"
                control={control}
                name="codigoVerificacion"
                error={errors.codigoVerificacion}
                rules={{
                    required: "El codigo de verificacion es obligatorio*",
                    minLength: {
                        value: 6,
                        message: "El codigo debe tener 6 digitos*"
                    }
                }}
            />
            <p>
                Ingresa el código de verificación que te enviamos a tu correo electrónico.
                Recuerda que este código es de un solo uso y exclusivo para ti.
            </p>
            <Button type="submit" variant="buttonAccept" disabled={isLoading}>
                {isLoading ? <LoaderSpiner /> : <>Continuar
                <CheckIcon /></>}
            </Button>
        </form>
    )

}