import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"


// Servicio para enviar correo de recuperacion de contraseña
export const sendVerificationEmail = async (data) => {

    try {
        await api.post("/passwordResetMail", data)
        return true


    } catch (error) {
        if (error.response.status){
            switch(error.response.status) {
                case HttpStatusCode.NotFound:
                    throw new Error("Este correo no esta registrado en el sistema")
                case HttpStatusCode.InternalServerError: 
                    throw new Error("Ups! tuvimos un problema del lado del servidor vuelve a intentantarlo mas tarde")
                case HttpStatusCode.BadRequest:
                    console.log(error.response.data.Error)
                    throw new Error("Algo salio mal, vuelve a intentarlo!")
            }
        }
        throw new Error("En este momento estamos haciendole mantenimiento al sistema, vuelve a intentarlo mas tarde.")
    }
}
