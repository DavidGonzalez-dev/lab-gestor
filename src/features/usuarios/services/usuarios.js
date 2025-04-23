import api from "@shared/services/api";

const VistaUsuarios = async (data) => {
  try {
    // Se hace el reuqest al servidor
    const response = await api.post("/usuarios", data);

    // Se verifica el codigo de respuesta
    if (response.status >= 200 || response.status <= 300) {
      return true;
    } else {
      console.log("Error en la respuesta", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error en la peticion", err);
    if (err.response) {
      console.error("Detalles del error", err.response);
      console.error("Estado:", err.response.status);
    }
    return false;
  }
};

export default VistaUsuarios;
