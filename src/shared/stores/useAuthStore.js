import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "@shared/services/api"
import { HttpStatusCode } from "axios"

// Creamos el store con persitencia
const useAuthStore = create(
    persist(
        (set) => ({
            // Estado incial
            userId: null,
            userRole: null,
            userName: null,
            isAuthenticated: false,
            isLoading: false,


            //Accicones
            // Funcion de autenticacion
            login: async (credentials) => {
                set({ isLoading: true })
                // Hacemos el fetch de datos para setear el rol del usuario y el id del mismo en el estado global
                try {
                    const response = await api.post("/login", credentials)
                    console.log(response.data.data.nombre)
                    set({ 
                        userRole: response.data.data.rol, 
                        userId: response.data.data.id,
                        userName: response.data.data.nombre,
                        isAuthenticated: true
                     })
                     return true
                }
                // En caso de haber un error
                catch (err) {
                    // En caso de haber un error 
                    switch (err.status) {
                        case HttpStatusCode.Unauthorized:
                            throw new Error(err.response.data.error)
                        default:
                            throw new Error("No es tu culpa es la nuestra, en este momento no es posible ingresar al sistema, vuelve a intentarlo mas tarde")
                    }
                }
                finally {
                    set({ isLoading: false })
                }
            },

            // Funcion para cerrar sesion
            logout: async () => {
                set({isLoading: true})
                //Hacemos la llamada a la api
                try{
                    await api.post("/logout")
                    window.location.replace("/login")
                }
                // En caso de un error arrojamos una expcion
                catch(err){
                    throw new Error(err.response.error)
                }
                finally{
                    set({
                        userId: null,
                        userRole: null,
                        userName: null,
                        isAuthenticated: false,
                        isLoading: false
                    })
                }
            }
        }),
        {            
            name: "auth-storage",
            partialize: (state) => ({
                userId: state.userId,
                userRole: state.userRole,
                userName: state.userName,
                isAuthenticated:state.isAuthenticated
            })
        }
    )
)

export default useAuthStore