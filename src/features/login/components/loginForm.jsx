
import Input from "@shared/components/inputs/input.jsx"
import Button from "@shared/components/buttons/button/Button.jsx"
import { useForm } from "@shared/hooks"
import login from "../services/login"
import "./loginFrom.css"

const LoginForm = () => {
    // Estado para guardar la informacion del form
    const { values, errors, handleChange, handleSubmit } = useForm({ ID: "", Contrasena: "" })
    
    const validationRules = {
        ID: { regex: /[0-9]/, errorMessage: "El nombre de usuario solo puede contener numeros*" },
        Contrasena: {}
    }

    const loginSuccess = async (e) => {
        e.preventDefault()
        const success = await handleSubmit(login, validationRules, values)

        if (success){
            window.location.href = "/dashboard"
        } else {
            errors.general = "Tu nombre de usuario o contraseña son incorrectas, cambialas y vuelve a intentar"
        }
    }

    return (
        <form onSubmit={loginSuccess}
            method="post" id="login-form">
            <div id="inputs">
                <Input type={"text"} name={"Nombre de Usuario"} id={"ID"} parentMethod={handleChange} />
                {errors.ID && <span>{errors.ID}</span>}
                <Input type={"password"} name={"Contraseña"} id={"Contrasena"} parentMethod={handleChange} />
                {errors.Contrasena && <span>{errors.Contrasena}</span>}
            </div>
            <Button lable={"Ingresar"} type={"submit"} />
            {errors.general && <span id="wrong-credentials">{errors.general}</span>}
        </form>

    )
}

export default LoginForm