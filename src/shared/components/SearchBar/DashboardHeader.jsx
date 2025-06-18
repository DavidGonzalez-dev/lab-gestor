import styles from "./DashboardHeader.module.css"
import useAuthStore from "../../stores/useAuthStore"

import { NotificacionIcon, PerfilIcon } from "@shared/iconos"
import Logo from "../../../../public/assets/logo/logo-nav.svg";



export const DashboardHeader = () => {

    const { userName } = useAuthStore()


    return (
        <nav className={styles.ContenedorPrincipal}>
            <div className={styles.BarraBusqueda}>
                <div className={styles.iconos}>
                    <a href="/perfil" className={styles.iconoPerfil}>
                        <PerfilIcon/>
                    </a>
                    <h3>Hola!{userName}</h3>
                </div>
                <div className={styles.logoBarraNavegacion}>
                    <img src={Logo.src} alt="logo" />
                </div>
            </div>
        </nav>
    )
}