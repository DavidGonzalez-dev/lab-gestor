import { create } from "zustand"
import { persist } from "zustand/middleware"
import { sendVerificationEmail as sendEmailService} from "@features/recuperacionContrasena/services"

const usePasswordResetStore = create(
    persist(
        (set) => ({
            // Estado inicial
            userEmail: null,

            //Acciones
            sendVerificationCode: async (data) => {
                try {
                    const mail = await sendEmailService(data)
                    if (mail) {
                        set({ userEmail: mail })
                    }
                    return true
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }),
        {
            name: "resetPassswordStorage",
            partialize: (state) => ({
                userEmail: state.userEmail
            })
        }
    )
)

export default usePasswordResetStore