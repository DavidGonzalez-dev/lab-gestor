import API from "@shared/services/api.js"
import { HttpStatusCode } from "axios";

// Este servicio nos permite registrar un control negativo de medios de cultivo
export const RegistrarControlNegativo = async (data) => {
    try {
        const response = await API.post("/controlesNegativos", data);
        return true

    } catch (error) {
        if (error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.UnprocessableEntity:
                    throw new Error(`Hubo un error al crear el producto: ${error.response.data.message}`)
                case HttpStatusCode.NotFound:
                    throw new Error("El producto al que quieres añadir este registro no existe, si otro usuario borro este producto intenta recargar la pagina para reflejar los cambios.")
                case HttpStatusCode.BadRequest:
                    throw new Error(`Hubo un error al crear el producto: ${error.response.data.message}`)
                case HttpStatusCode.InternalServerError:
                    throw new Error(`Hubo un error del lado del servidor: ${error.response.data.error}`)
            }
        }

        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor vuelve a intentarlo mas tarde")
    }
}

// Este servicio nos permite obtener los controles negativos de un producto
export const GetControlesNegativosProducto = async (numeroRegistroProducto) => {

    try {
        const response = await API.get(`/controlesNegativos/producto/${numeroRegistroProducto}`)
        if (response.data) {
            return response.data.data
        }
        return []
    } catch (error) {
        if (error.response.status) {
            switch (error.response.status) {
                case HttpStatusCode.NotFound:
                    throw new Error("El producto no existe, si otro usuario borro este producto intenta recargar la pagina para reflejar los cambios.")
                case HttpStatusCode.InternalServerError:
                    throw new Error(error.response.error)
            }
        }
        throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor vuelve a intentarlo mas tarde")
    }
}

// Este servicio nos permite eliminar un registro de control negativo
export const DeleteControlNegativo = async (id) => {
    try {
        await API.delete(`/controlesNegativos/${id}`)
        return true

    } catch (error) {
        if (error.response.status) {
            switch(error.response.status){
                case HttpStatusCode.NotFound:
                    throw new Error("Este registro no existe, es posible que otro usuario lo halla eliminado, recarga la pagina para ver los cambios mas recientes")
                case HttpStatusCode.InternalServerError:
                    throw new Error(`"Hubo un error al eliminar el registro: ${error.response.data.error}`)
            }
        }

        throw new Error("Lo sentimos, estamos teniendo problemas con el servidor, vuelve a intentarlo mas tarde.")
    }
}