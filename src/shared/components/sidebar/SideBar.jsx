import { useState } from "react";
import Logo from "../../../../public/assets/logo/logo-nav.svg"
import { BarraLateralIcon, BarraDeslizadaIcon, ClientesIcon, FabricantesIcon, InicioIcon, ProductosIcon, ReporteIcon, EstadisticasIcon, UsuariosIcon, PerfilIcon, CerrarSesionIcon } from "@shared/iconos";  
import styles from "./SideBar.module.css"
import api from "@shared/services/api"

export function SideBar() {
    // Estado para controlar si está expandida o colapsada
    const [expandida, setExpandida] = useState(true);

    // Funcion para cambiar el estado de la barra lateral
    const toggleBarra = () => {
        // Cambia el estado al hacer clic
        setExpandida(!expandida)
    }

    // Funcion para destruir todas las cookies del navegador
    const logOut = async () => {
        try{
            await api.post("/logout")
            window.location.href = "/login"
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <aside className={`${styles.sidebar} ${!expandida ? styles.colapsada : ''}`}>
            <div className={styles.sidebarContent}>
                {/* LOGO Y BOTÓN PARA EXPANDIR Y COLAPSAR */}
                <div className={styles.upperSidebar}>
                    <div className={styles.logo}>
                        {/* Solo se muestra el logo si la barra está expandida */}
                        {expandida && <img src={Logo.src} alt="logo" />}
                        {/* Botón con evento para colapsar o expandir */}
                        <button onClick={toggleBarra} className={styles.toggleBarra}>
                            {expandida ? <BarraLateralIcon /> : <BarraDeslizadaIcon />}
                        </button>
                    </div>

                    <article className={styles.menu}>
                        {/* HOME */}
                        <a href="/inicio" className={styles.sidebarLink}>
                            <InicioIcon/>
                            {expandida && <span>Inicio</span>}
                        </a>

                        {/* PRODUCTOS */}
                        <a href="/productos" className={styles.sidebarLink}>
                            <ProductosIcon/>
                            {expandida && <span>Productos</span>}
                        </a>

                        {/* FABRICANTES */}
                        <a href="/fabricantes" className={styles.sidebarLink}>
                            <FabricantesIcon />
                            {expandida && <span>Fabricantes</span>}
                        </a>

                        {/* CLIENTES */}
                        <a href="/clientes" className={styles.sidebarLink}>
                            <ClientesIcon />
                            {expandida && <span>Clientes</span>}
                        </a>

                        {/* REPORTE DE ANALISIS */}
                        <a href="/reporte" className={styles.sidebarLink}>
                            <ReporteIcon />
                            {expandida && <span>Reporte de Analisis</span>}
                        </a>

                        {/* ESTADISTICAS */}
                        <a href="/estadisticas" className={styles.sidebarLink}>
                            <EstadisticasIcon />
                            {expandida && <span>Estadisticas del Area</span>}
                        </a>

                        {/* GESTIÓN DE USUARIOS */}
                        <a href="/usuarios" className={styles.sidebarLink}>
                            <UsuariosIcon />
                            {expandida && <span>Gestionar Usuarios</span>}
                        </a>
                    </article>
                </div>

                {/* BOTONES INFERIORES */}
                <article className={styles.botones}>
                    <a href="/perfil" className={styles.sidebarLink}>
                        <PerfilIcon />
                        {expandida && <span>Perfil</span>}
                    </a>

                    <button href="/salir" className={styles.sidebarLink} onClick={logOut}>
                        <CerrarSesionIcon />
                        {expandida && <span>Cerrar Sesion</span>}
                    </button>
                </article>
            </div>
        </aside>
    )
}