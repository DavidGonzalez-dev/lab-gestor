
import Input from "@shared/components/inputs/input.jsx"
import Button from "@shared/components/buttons/button/Button.jsx"
import login from "../services/login";
import { useEffect, useState } from "react";
import "./loginFrom.css"

const LoginForm = () => {
    // Estado para guardar la informacion del form
    const [formData, setFormData] = useState({
        ID: '',
        Contrasena: ''
    })

    // Estado para trackear errores
    const [errors, setErrors] = useState({})

    // Funcion para manejar el input de los usuarios en tiempo real
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))
    }
    // Funcion para validar los campos del formulario y mapear los posibles errores en el estado del componente
    const validate = (data = formData) => {
        // Se crea una nueva variable para guardar los errores que se vayan presentando durante las validaciones
        const newErrors = {}

        // Validaciones de campo
        if (data.ID.trim() == '') {
            newErrors.missingID = "El campo documento es obligatorio*"
        }
        if (data.Contrasena.trim() == '') {
            newErrors.missingPassword = "El campo contraseña es obligatorio*"
        }

        return newErrors
    }
    // Llamada a la api y validacion de respuestas
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Se obtienen los errores actuales y el numero de errores
        const validationErrors = validate()
        const errorNumber = Object.keys(validationErrors).length != 0

        if (errorNumber != 0) {
            setErrors(validationErrors)
            return
        }

        // Se verifica la respuesta del servidor
        const success = await login(formData)
        if (!success) {
            setErrors(errors => ({ general: "Tu nombre de usuario o contraseña son incorrectas, cambialas y vuelve a intentarlo" }))
        } else {
            window.location.href = "../dashboard"
        }

    }

    useEffect(() => {
        setErrors({})
    }, [])

    return (
        <form onSubmit={handleSubmit} method="post" id="login-form">
            <div id="inputs">
                <Input type={"text"} name={"Nombre de Usuario"} id={"ID"} parentMethod={handleChange} />
                {errors.missingID && <span>{errors.missingID}</span>}
                <Input type={"password"} name={"Contraseña"} id={"Contrasena"} parentMethod={handleChange} />
                {errors.missingPassword && <span>{errors.missingPassword}</span>}
            </div>
            <Button lable={"Ingresar"} type={"submit"} />
            {errors.general && <span id="wrong-credentials">{errors.general}</span>}
        </form>

    )
}

export default LoginForm