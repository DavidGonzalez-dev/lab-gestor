import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:8080", Configuracion para desarrollo local
    baseURL: "https://api.labgestor.com", // Configuracion produccion
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default API