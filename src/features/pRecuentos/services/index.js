import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"

// ESTE SERVCIO PERMITE REGISTRAR UNA PRUEBA DE RECUENTO DE  PRODUCTO HACIENDO USO DE LA API
export const RegistrarPrecuento = async (data) => {
  // SE HACE EL LLAMADO A LA API
  try {
    await api.post("/pruebasRecuento", data)
    return true
  } 
  catch (err) {
    // Si hay respuesta del servidor
    console.log(err)
    switch(err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error);
      case HttpStatusCode.Conflict:
        throw new Error(err.response.data.error)
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);
    }
  }
}

// Este servicio permite editar una prueba de recuento 
export const EditarPrecuento = async (id, data) => {
  try {
    const response = await api.put(`/pruebasRecuento/${id}`, data)
    // Validar que efectivamente devolvió algo útil
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error("No se pudo actualizar el recuento correctamente.")
    }

  } catch (err) {
    console.log(err)
    switch (err.response?.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error)
      case HttpStatusCode.NotFound:
        throw new Error("El recuento que estás intentando editar no existe.");
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde.");
    }
  }
}
// Este servicio permite visionar una prueba de recuento por id
export const VistaRecuentoID = async (id)=>{
  try {
    const response = await api.get(`pruebasRecuento/${id}`)
    return response.data.data
  }  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error)
      case HttpStatusCode.NotFound:
        throw new Error("El recuento que estas intentando visionar no existe");
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
    }
}

// Este servicio permite eliminar el recuento
export const EliminarRecuento =async (id) => {
  try {
    await api.delete(`/pruebasRecuento/${id}`)
    return true
  } catch (err) {
     switch(err.response.status) {
            case HttpStatusCode.NotFound:
                throw new Error("El Recuento ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!")
            case HttpStatusCode.Conflict:
                throw new Error("Este Recuento tiene actualmente productos relacionados, por ende no se puede borrar.")
        }
  }
}