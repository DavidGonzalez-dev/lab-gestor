import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"




// ESTE SERVCIO PERMITE REGISTRAR UN PRODUCTO HACIENDO USO DE LA API
export const RegistrarProducto = async (data) => {
  // SE HACE EL LLAMADO A LA API
  try {
    await api.post("/productos/crear", data)
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
