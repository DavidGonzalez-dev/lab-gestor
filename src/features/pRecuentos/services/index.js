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
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}

// Este servicio permite editar una prueba de recuento 
export const EditarPrecuento = async (id, data) => {
  // Se hace el llamado a la API para editar el recuento
  try {
    await api.put(`/pruebasRecuento/${id}`, data)
    return true
  } 
  catch (err) {
    console.log(err)
    switch(err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error);
      case HttpStatusCode.NotFound:
        throw new Error("El recuento que estas intentando editar no existe");
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}