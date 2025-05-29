import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"


// ESTE SERVCIO PERMITE REGISTRAR UN PRODUCTO HACIENDO USO DE LA API
export const RegistrarProducto = async (data) => {
  // SE HACE EL LLAMADO A LA API
  try {
    await api.post("/productos", data)
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

// Este servicio nos permite obtener la informacion de las entradas de productos
export const GetRegistrosEntradaProducto = async () => {

  // Se hace el llamado a la api
  try {
    const response = await api.get("/registroEntradaProductos")
    if (response.data.data) {
      return response.data.data
    }
    return []
  }

  // En caso de errores se manejan los errores
  catch (err) {
    // Devolvemos un mensaje de error dependiendo del estado de la peticion
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu somo nosotros, tenemos problemas de conexion vuelve a intentarlo mas tarde!")
    }
  }

}

// Este servicio nos permite obtener la informacion de las entradas de productos de un usuario en especifico
export const GetRegsitrosEntradaProductoPorUsuario = async (idUsuario) => {
  // Se hace el llamado a la api
  try {
    const response = await api.get(`/registroEntradaProductos/user/${idUsuario}`)
    if (response.data.data) {
      return response.data.data
    }
    return []
  }

  // En caso de errores se manejan los errores
  catch (err) {
    // Devolvemos un mensaje de error dependiendo del estado de la peticion
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu somo nosotros, tenemos problemas de conexion vuelve a intentarlo mas tarde!")
    }
  }
}

// Este servicio nos permite obtener eliminar un producto en la base de datos
export const deleteProducto = async (numeroRegistroProducto) => {

  // Se hace el llamado a la api
  try {
    await api.delete(`/productos/${numeroRegistroProducto}`)
    return true
  }

  // En caso de errores se envia un mensaje personalizado dependiendo del estado devuelto
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error("Este producto ya ha sido eliminado, intenta recargar la pagina si lo sigues viendo")
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu comos nosotros, hubo en error de nuestra parte vuelve a intentarlo!")

    }
  }
}

// Este servicio nos permite obtener la informacion de un producto en especifico
export const GetProductId = async (numeroRegistro) => {
  // Se hace el llamado a la api
  try {
    const response = await api.get(`/productos/${numeroRegistro}`)
    if (response.data.data) {
      return response.data.data
    }
    return []
  }

  // En caso de errores se manejan los errores
  catch (err) {
    console.log(err)
    // Devolvemos un mensaje de error dependiendo del estado de la peticion
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error("No se encontro el producto, intenta recargar la pagina")
      default:
        throw new Error("No eres tu somo nosotros, tenemos problemas de conexion vuelve a intentarlo mas tarde!")
    }
  }
}

export const UpdateProduct = async (numeroRegistro, payload) => {
  console.log(payload)
   try {
      await api.put(`/productos/${numeroRegistro}`, payload)
      return true
   } catch (error) {
      if(error.response.status){
        switch(error.response.status){
          case HttpStatusCode.UnprocessableEntity:
            throw new Error(error.response.data.error)
          case HttpStatusCode.NotFound:
            throw new Error("El producto que estas intentando actualizar no existe, si tu u otro usuario lo elimino de la base de datos intenta recargar la pagina para reflejar los cambios")
          case HttpStatusCode.InternalServerError:
            throw new Error("Ups! no eres tu, tuvimos un problema en el servidor, vuelve a intentarlo mas tarde.")
        }
      }
      throw new Error("Error desconocido")
   }
} 
