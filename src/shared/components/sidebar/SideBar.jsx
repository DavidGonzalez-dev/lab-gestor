import useAuthStore from "@shared/stores/useAuthStore.js";
import useSidebarStore from "@shared/stores/useSidebarStore.js";
import Logo from "../../../../public/assets/logo/logo-nav.svg"
import { BarraLateralIcon, BarraDeslizadaIcon, ClientesIcon, FabricantesIcon, InicioIcon, ProductosIcon, ReporteIcon, EstadisticasIcon, UsuariosIcon, PerfilIcon, CerrarSesionIcon } from "@shared/iconos";
import styles from "./SideBar.module.css"
import { useEffect } from "react";

export function SideBar() {
    // Estado para controlar si está expandida o colapsada
    const { isCollapsed, toggleSidebar } = useSidebarStore()
    const { logout, userRole, isAuthenticated } = useAuthStore()


    // Revisamos si el usuario esta autenticdo antes de renderizar la vista

    useEffect(() => {
        if (!isAuthenticated) {
            // Este paso es importante para que NO renderice nada mientras redirige
            window.location.href = "/login";
        }
    }, [isAuthenticated]);

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.colapsada : ''}`}>
            <div className={styles.sidebarContent}>
                {/* LOGO Y BOTÓN PARA EXPANDIR Y COLAPSAR */}
                <div className={styles.upperSidebar}>
                    <div className={styles.logo}>
                        {/* Solo se muestra el logo si la barra está expandida */}
                        {!isCollapsed && <img src={Logo.src} alt="logo" />}
                        {/* Botón con evento para colapsar o expandir */}
                        <button onClick={toggleSidebar} className={styles.toggleBarra}>
                            {!isCollapsed ? <BarraLateralIcon /> : <BarraDeslizadaIcon />}
                        </button>
                    </div>

                    <article className={styles.menu}>
                        {/* HOME */}
                        <a href="/inicio" className={styles.sidebarLink}>
                            <InicioIcon />
                            {!isCollapsed && <span>Inicio</span>}
                        </a>

                        {/* PRODUCTOS */}
                        <a href="/productos" className={styles.sidebarLink}>
                            <ProductosIcon />
                            {!isCollapsed && <span>Productos</span>}
                        </a>

                        {/* FABRICANTES */}
                        <a href="/fabricantes" className={styles.sidebarLink}>
                            <FabricantesIcon />
                            {!isCollapsed && <span>Fabricantes</span>}
                        </a>

                        {/* CLIENTES */}
                        <a href="/clientes" className={styles.sidebarLink}>
                            <ClientesIcon />
                            {!isCollapsed && <span>Clientes</span>}
                        </a>

                        {/* REPORTE DE ANALISIS */}
                        <a href="/reporte" className={styles.sidebarLink}>
                            <ReporteIcon />
                            {!isCollapsed && <span>Reporte de Analisis</span>}
                        </a>

                        {/* ESTADISTICAS */}





                        {userRole === "admin" && (
                            <>
                                {/* MODULO DE ESTADISTICAS */}
                                <a href="/estadisticas" className={styles.sidebarLink}>
                                    <EstadisticasIcon />
                                    {!isCollapsed && <span>Estadisticas del Area</span>}
                                </a>
                                {/* MODULO DE USUARIOS */}
                                <a href="/usuarios" className={styles.sidebarLink}>
                                    <UsuariosIcon />
                                    {!isCollapsed && <span>Gestionar Usuarios</span>}
                                </a>
                            </>
                        )}
                    </article>
                </div>

                {/* BOTONES INFERIORES */}
                <article className={styles.botones}>
                    <a href="/perfil" className={styles.sidebarLink}>
                        <PerfilIcon />
                        {!isCollapsed && <span>Perfil</span>}
                    </a>

                    <button className={styles.sidebarLink} onClick={logout}>
                        <CerrarSesionIcon />
                        {!isCollapsed && <span>Cerrar Sesion</span>}
                    </button>
                </article>
            </div>
        </aside>
    )
}