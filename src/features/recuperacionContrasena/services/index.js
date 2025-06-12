import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"


// Servicio para enviar correo de recuperacion de contraseña
export const sendVerificationEmail = async (data) => {

    try {
        const response = await api.post("/passwordResetMail", data)
        if (response.data.data){
            return response.data.data.correoUsuario
        }


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
                case HttpStatusCode.TooManyRequests:
                    throw new Error("Has excedido la cantidad de token generado, por favor espera 30 min para volver a solicitar tu token")
            }
        }
        throw new Error("En este momento estamos haciendole mantenimiento al sistema, vuelve a intentarlo mas tarde.")
    }
}

// Servicio para verificar el codigo de verificacion
export const validateVerificationToke = async (data) => {

    try {
        
        await api.post("/verifyToken", data)
        return true

    } catch (error) {
        if (error.response.status){
            switch(error.response.status){
                case HttpStatusCode.NotFound:
                    throw new Error(error.response.data.message)
                case HttpStatusCode.Gone:
                    throw new Error(error.response.data.message)
                case HttpStatusCode.Unauthorized:
                    throw new Error("Ups! Este codigo de verificacion no corresponde a ninguno generado recientemente, vuelve a intentarlo.")
            }
        }
        throw new Error("Ups! no es tu culpa es nuestra, estamos teniendo problemas con el servidor en este momento, vuelve a intentarlo mas tarde.")
    }   
}

// Servicio para cambiar la contraseña de un usaurio
export const resetPassword = async (data) => {
    
    try {
        await api.patch("/passwordReset", data)
        return true
    } catch (error) {
        if(error.response.status){
            switch(error.response.status){
                case HttpStatusCode.NotFound:
                    throw new Error("No puedes cambiar la contraseña de este usuario, genera el token de nuevo y vuelve a intentarlo. Si el error persiste contacta al soporte tecnico!")
                case HttpStatusCode.Unauthorized:
                    throw new Error(`No tienes autorizacion para realizar esta accion, si no has generado tu token de verificacion o este ya expiró puedes generarlo de nuevo y volver a intentarlo.<br><br><strong>Información del error:</strong> ${error.response.data.error}`)
                case HttpStatusCode.InternalServerError:
                    throw new Error("Ups! hubo un error al completar tu cambio de contraseña, por favor vuelve a intentarlo");     
            }
        }
        throw new Error("Ups! no es tu culpa es nuestra, estamos teniendo problemas con el servidor en este momento, vuelve a intentarlo mas tarde.")
    }
}