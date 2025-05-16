import api from "@shared/services/api"
import { HttpStatusCode } from "axios"

// Este servicio nos trae la informacion de todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get("/usuarios")
    if (response.data.data) {
      return response.data.data
    }
    return []
  } catch (err) {
    // Manejamos posibles exepciones de axios
    // Arrojamos una excepcion en dependiendo del codigo de respuesta
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error(
          "Ups! Hubo un error en el servidor vuelve a intentar mas tarde"
        )
      default:
        throw new Error("No se encontraron usuarios")
    }
  }
}

// Este servicio nos permite registrar un usaurio haciendo uso de la API
export const RegistrarUsuario = async (data) => {
  try {
    // Se hace la llamada a la API
    await api.post("/usuarios/registrar", data)
    return true
  } catch (err) {
    // Arrojamos un error dependiendo del status
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error)
      default:
        throw new Error("Error en el servidor vuelve a intentarlo mas tarde")
    }
  }
}

// Este servicio
export const DeshabilitarUsuario = async (id) => {
  // Se hace la llamada a la api
  try {
    await api.delete(`usuarios/${id}`)
    return true
  } catch (err) {
    // Si ocurre un error se maneja
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Hubo un error al eliminar el usuario")
    }
  }
}

// Este servicio nos permite obtener ver la formacion de un usuario en especifico
export const getUsuarioID = async (id) => {
  
  try {
    const response = await api.get(`usuarios/${id}`)
    return response.data
  } 
  
  catch (error) {
    // Si ocurre un error se maneja
    switch (error.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Hubo un error al obtener el usuario")
    }
  }
}
//sirve para editar el usuario
export const EditUser = async (data) => {
  
  try {
    await api.put(`usuarios/actualizar`, data)
    return true
  } 
  
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error)
      default:
        console.log(data)
        throw new Error("Error en el servidor vuelve a intentarlo mas tarde")
    }
  }
}
