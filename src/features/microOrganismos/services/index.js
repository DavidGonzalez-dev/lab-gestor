import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"

// ESTE SERVCIO PERMITE REGISTRAR UNA PRUEBA DE RECUENTO DE  PRODUCTO HACIENDO USO DE LA API
export const RegistrarOrganismo = async (data) => {
  // SE HACE EL LLAMADO A LA API
  try {
    await api.post("/deteccionMicroorganismos", data)
    return true
  }
  catch (err) {
    // Si hay respuesta del servidor
    console.log(err)
    switch (err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error);
      case HttpStatusCode.Conflict:
        throw new Error(err.response.data.error)
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}

// Este servicio permite editar una prueba de recuento 
export const EditOrganismo = async (id, data) => {
  try {
    const response = await api.put(`/deteccionMicroorganismos/${id}`, data)
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
export const VistaOrganismosID = async (id) => {
  try {
    const response = await api.get(`deteccionMicroorganismos/${id}`)
    return response.data.data
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error)
      case HttpStatusCode.NotFound:
        throw new Error("El Micro Organismo que estas intentando visionar no existe");
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}

// Este servicio permite eliminar el recuento
export const EliminarOrganismo = async (id) => {
  try {
    await api.delete(`/deteccionMicroorganismos/${id}`)
    return true
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error("El Micro Organismo ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!")
      case HttpStatusCode.Conflict:
        throw new Error("Este Micro organismos tiene actualmente productos relacionados, por ende no se puede borrar.")
    }
  }
}

// Este servicio nos perite registrar el resultado de un recuento
export const ActualizarResultadoOrganismo = async (id, data) => {
  try {
    await api.patch(`/terminarDeteccionMicroorganismos/${id}`, data);
    return true

  } catch (err) {

    if (err.response.status) {

      switch (err.response.status) {
        case HttpStatusCode.UnprocessableEntity:
          throw new Error(err.response.data.error);
        case HttpStatusCode.NotFound:
          throw new Error("El recuento que estás intentando actualizar no existe.");
        default:
          throw new Error("Error en el servidor, vuelve a intentarlo más tarde.");
      }

    }
    throw new Error("Estamos teniendo problemas con el servidor vuelve a intentarlo mas tarde");
    
  }
}