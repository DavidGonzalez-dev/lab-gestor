import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default API