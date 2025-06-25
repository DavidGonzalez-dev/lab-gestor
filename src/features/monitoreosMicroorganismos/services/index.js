import api from "@shared/services/api"
import { HttpStatusCode } from "axios"

// Este servicio permite obtener los monitoreos de una deteccion por id
export const GetMonitoreosDeteccionById = async (id) => {
    try {

        const response = await api.get(`/monitoreosDetecciones/detecciones/${id}`)
        if (response.data) {
            return response.data.data
        }
        return []

    } catch (error) {
        console.log(error)
        if (error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.InternalServerError:
                    throw new Error(`Hubo un error del lado del servidor: ${error.response.data.error}`)
                case HttpStatusCode.NotFound:
                    throw new Error(`No existe una deteccion con este id`)
            }
        }
        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor, vuelve a intentarlo mas tarde")
    }
}

// Este servicio nos permite eliminar un registro de monitoreo de deteccion por id
export const DeleteMonitoreoDeteccionById = async (id) => {
    try {
        await api.delete(`/monitoreosDetecciones/${id}`)
        return true
    } catch (error) {
        if (error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.InternalServerError:
                    throw new Error(`Error del lado del servidor: ${error.response.data.error}`)
                case HttpStatusCode.NotAcceptable:
                    throw new Error(`No existe una deteccion con este id`)
            }
        }
        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor, vuelve a intentarlo mas tarde")
    }
}

// Este servicio nos permite crear un registro de monitoreo de deteccion de microorganismo
export const CreateMonitoreoDeteccion = async (data) => {
    try {
        const response = await api.post(`/monitoreosDetecciones`, data)
        return response.data
    } catch (error) {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.InternalServerError:
                    throw new Error(`Error del lado del servidor: ${error.response.data.error}`)
                case HttpStatusCode.NotAcceptable:
                    throw new Error(`No se pudo crear el monitoreo de detección`)
                case HttpStatusCode.BadRequest:
                    throw new Error(`Hubo un error al crear el registro: ${error.response.data.error}`)
            }
        }
        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor, vuelve a intentarlo más tarde")
    }
}

// Este servicio nos permite actualizar un registro de monitoreo de deteccion de microorganismo
export const UpdateMonitoreoDeteccion = async (id, data) => {
    try {
        const response = await api.put(`/monitoreosDetecciones/${id}`, data)
        return response.data
    } catch (error) {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.InternalServerError:
                    throw new Error(`Error del lado del servidor: ${error.response.data.error}`)
                case HttpStatusCode.NotAcceptable:
                    throw new Error(`No se pudo actualizar el monitoreo de detección`)
                case HttpStatusCode.BadRequest:
                    throw new Error(`Hubo un error al actualizar el registro: ${error.response.data.error}`)
            }
        }
        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor, vuelve a intentarlo más tarde")
    }
}