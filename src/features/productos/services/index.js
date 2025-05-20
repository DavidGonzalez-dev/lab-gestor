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

// Este servicio nos permite obtener la informacion de las entradas de productos
export const GetRegistrosEntradaProducto = async () => {

  // Se hace el llamado a la api
  try{
    const response = await api.get("/registroEntradaProductos")
    console.log(response.data.data)
    if(response.data.data) {
      return response.data.data
    }
    return []
  }

  // En caso de errores se manejan los errores
  catch(err){
    // Devolvemos un mensaje de error dependiendo del estado de la peticion
    switch(err.response.status){
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu somo nosotros, tenemos problemas de conexion vuelve a intentarlo mas tarde!")
    }
  }

}
