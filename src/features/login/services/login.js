import api from "@shared/services/api"
import { HttpStatusCode } from "axios"

const login = async (data) => {
    try {
        // Se hace el request al servidor
        await api.post("/login", data)
        return true

    } catch (err) {

        // Devolvemos un error dependiendo del estado de la respuesta
        switch (err.response.status) {
            case HttpStatusCode.Unauthorized:
                throw new Error("Ups! Tu documento o contraseña son incorrectos vuelve a intentarlo*")
            default:
                throw new Error("Lo sentimos, hemos cometido un error vuelve a intentarlo mas tarde")
        }
    }
}

export default login