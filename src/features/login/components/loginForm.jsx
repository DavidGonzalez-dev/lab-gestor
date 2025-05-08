import { Input, Button } from "@shared/components/";
import login from "../services/login";
import styles from "./loginFrom.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginForm = () => {
    // Estado para manejar cuando el componente esta cargando o no
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [hasServerError, setHasServerError] = useState(false)

    // Importamos las utilidades de react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setIsLoading(true)
            // Se verifica si la respuesta de la api fue positiva
            const success = await login(data);
            // En caso de haber aprobador las credenciales se redirige al dashboard
            if (success) {
                Swal.fire({ title: "Bienvenido", confirmButtonText: "Continar", confirmButtonColor: "#22861e", icon:"success"}).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/dashboard";
                    }
                })
            }

        } catch (error) {
            setServerError(error.message)
            setHasServerError(true)

        } finally {
            setIsLoading(false)
        }

    };

    const clearErrorsOnFocus = () => {
        setServerError("")
        setHasServerError(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id={styles.loginForm}>
            <div id={styles.inputs}>
                <Input
                    id={"documento"}
                    type={"text"}
                    label={"Nombre de Usuario"}
                    placeHolder={"Ej: 1234567"}
                    disabled={isLoading}
                    hasServerError={hasServerError}
                    onFocus={clearErrorsOnFocus}
                    error={errors.documento}
                    {...register("documento", {
                        required: "El documento es requerido*",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El documento solo debe contener números*",
                        },
                    })}
                />

                <Input
                    id={"password"}
                    type={"password"}
                    label={"Contraseña"}
                    placeHolder={"Ingrese su contraseña"}
                    disabled={isLoading}
                    hasServerError={hasServerError}
                    onFocus={clearErrorsOnFocus}
                    error={errors.password}
                    {...register("password", {
                        required: "La contraseña es requerida*",
                    })}
                />
            </div>
            <Button type={"submit"} disabled={isLoading}>{isLoading ? "Cargando..." : "Ingresar"}</Button>
            {serverError && <span id={styles.wrongCredentialsSpan}>{serverError}</span>}
        </form>
    );
};

export default LoginForm;
