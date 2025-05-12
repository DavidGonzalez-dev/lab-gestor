import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"


//Serviciio para obtener cliente
export const obtenerClientes = async () => {
  try {
    const response = await api.get("/clientes");
    if (response.data.data) {
      return response.data.data; 
    } 
    return[]

  } 
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Ups! Hubo un error en el servidor vuelve a intentar mas tarde")
      default:
        throw new Error("No se encontraron cliente");

    }
  }
};


// Servicio para obtener fabricantes
export const obtenerFabricantes = async () => {
  try {
    const response = await api.get("/fabricantes/");
    if (response.data.data) {
      return response.data.data; 
    } 
    return[]

  } 
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Ups! Hubo un error en el servidor vuelve a intentar mas tarde")
      default:
        throw new Error("No se encontraron cliente");

    }
  }
};


// ESTE SERVCIO PERMITE REGISTRAR UN PRODUCTO HACIENDO USO DE LA API
export const RegistrarProducto = async (data) => {

  try {
    // SE HACE EL LLAMADO A LA API
    await api.post("/productos/crear", data)
    return true
  } 

  catch (err) {
    // Si hay respuesta del servidor
    console.log(err)
    switch(err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}
