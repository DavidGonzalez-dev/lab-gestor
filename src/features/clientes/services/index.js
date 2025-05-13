import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"

export const registrarCliente = async (data) => {
    // Se hace la llamada a la api
    try{
        await api.post("/clientes/registrar", data)
        return true
    }
    // En caso de haber un error se gestiona y se envia un mensaje de error
    catch (err){
        switch(err.response.status){
            case HttpStatusCode.BadRequest:
                throw new Error(err.response.data.error)
        }
        return false
    }
}

export const getClientes = async () => {

    // Se intenta hacer el llamado a la api
    try{
        const response = await api.get("/clientes")
        return response.data.data
    }
    // En caso de haber un error se gestiona
    catch (err) {
        console.log(err)
    }
}

// Este servicio nos permite elmiminar un Cliente de la base de datos
export const eliminarCliente = async (id) => {
    try{
        await api.delete(`/clientes/${id}`)
        return true
    }
    catch (err) {
        switch(err.response.status) {
            case HttpStatusCode.NotFound:
                throw new Error("El cliente ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!")
            case HttpStatusCode.Conflict:
                throw new Error("Este cliente tiene actualmente productos relacionados, por ende no se puede borrar.")
        }
    }
}