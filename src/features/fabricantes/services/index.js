import api from "@shared/services/api"
import { HttpStatusCode } from "axios"

// Este servicio nos permite registrar un fabricante en la base de datos
export const registrarFabricante = async (data) => {
    // Se intenta hacer el envio de la informacion
    try {
        await api.post("/fabricantes", data)
        return true
    }
    // En caso de haber un error retornamos un mensaje de errr teniendo en cuenta el codigo de estado de la respuesta
    catch (err) {
        console.log(err)
        switch (err.response.status) {
            case HttpStatusCode.BadRequest:
                throw new Error(err.response.data.error)
            default:
                throw new Error("No es culpa tuya es culpa nuestra, en este momento el sistema esta en mantenimiento!")
        }
    }
}

// Este servicio nos permite traer a todos los Fabricantes
export const getFabricantes = async (data) => {

    // Se intenta hacer el envio de la informacion
    try {
        const fabricantes = await api.get("/fabricantes", data)
        return fabricantes.data.data
    }
    // En caso de haber un error retornamos un mensaje de errr teniendo en cuenta el codigo de estado de la respuesta
    catch (err) {
        console.log(err)
        switch (err.response.status) {
            case HttpStatusCode.BadRequest:
                throw new Error("Hubo un error al crear el usuario")
            default:
                throw new Error("No es culpa tuya es culpa nuestra, en este momento el sistema esta en mantenimiento!")
        }
    }
}

// Este servicio nos permite elmiminar un fabricante de la base de datos
export const eliminarFabricante = async (id) => {
    try{
        await api.delete(`/fabricantes/${id}`)
        return true
    }
    catch (err) {
        switch(err.response.status) {
            case HttpStatusCode.NotFound:
                throw new Error("El fabricante ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!")
            case HttpStatusCode.Conflict:
                throw new Error("Este fabricante tiene actualmente productos relacionados, por ende no se puede borrar.")
        }
    }
}

// Es te servicio nos permite obtener la informacion de un solo fabricante desde la base de datos
export const getFabricanteId = async (id, cookies) => {
  
    try {
    const response = await api.get(`fabricantes/${id}`, {
        headers: {
            Cookie: cookies
        }
    });
    return response.data.data;

  } 
  
  catch (error) {
    // Si ocurre un error se maneja
    switch (error.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Hubo un error al obtener el Fabricante");
    }
  }
};

//Este servicio sirve para poder actualizar la informacion de un Fabricante
export const EditFabricante = async (id, payload) => {
  
  try {
    await api.put(`fabricantes/${id}`, payload);
    return true;
  } 
  
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);
      default:
        console.log(payload);
        throw new Error("Error en el servidor vuelve a intentarlo mas tarde");
    }
  }
};
