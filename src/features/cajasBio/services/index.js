import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"

// Crear una caja Bioburden
export const registrarCaja = async (data) => {
  try {
    await api.post("/cajasBioburden", data)
    return true
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error)
      default:
        throw new Error("Error al registrar la caja.")
    }
  }
}


// Obtener caja por ID
export const getCajaById = async (id, cookies) => {
  try {
    const response = await api.get(`/cajasBioburden/${id}`, {
      headers: {
        Cookie: cookies
      }
    })
    
    return response.data.data
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Hubo un error al obtener la caja Bioburden.")
      default:
        throw new Error("Ocurrió un error inesperado.")
    }
  }
}

// Eliminar una caja Bioburden
export const deleteCaja = async (id) => {
  try {
    await api.delete(`/cajasBioburden/${id}`)
    return true
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error("La caja ya ha sido eliminada, intenta recargar la página.")
      case HttpStatusCode.Conflict:
        throw new Error("Esta caja tiene relaciones activas y no se puede eliminar.")
      default:
        throw new Error("No se pudo eliminar la caja.")
    }
  }
}

// Actualizar caja Bioburden
export const updateCaja = async (id, payload) => {
  console.log(payload)
  try {
    await api.put(`/cajasBioburden/${id}`, payload)
    return true
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error)
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde.")
    }
  }
  
}

// Obtener cajas Bioburden asociadas a una Prueba de Recuento
export const getCajasByPruebaRecuento = async (id) => {
  try {
    const response = await api.get(`/cajasBioburden/pruebaRecuento/${id}`);
    console.log (response.data.data)
    return response.data.data
  } catch (err) {
    switch (err.response?.status) {
      case HttpStatusCode.NotFound:
        throw new Error("No se encontraron cajas asociadas a este recuento.");
      case HttpStatusCode.BadRequest:
        throw new Error("ID de prueba de recuento inválido.");
      default:
        throw new Error("Error al obtener las cajas asociadas.");
    }
  }
};