import { useState } from "react";
import Logo from "../../../../public/assets/logo/logo-nav.svg"
import { BarraLateralIcon, BarraDeslizadaIcon, ClientesIcon, FabricantesIcon, InicioIcon, ProductosIcon, ReporteIcon, EstadisticasIcon, UsuariosIcon, PerfilIcon, CerrarSesionIcon } from "@shared/iconos";  
import "./admin.css"
import "@shared/styles/variables.css"


export function SideBar() {
    // Estado para controlar si está expandida o colapsada
    const [expandida, setExpandida] = useState(true);

    const toggleBarra = () => {
        // Cambia el estado al hacer clic
        setExpandida(!expandida)
    }

    return (
        <aside className={`sidebar ${expandida ? "expandida" : "colapsada"}`}> {/* Clase dinámica */}
            <div className="sidebar-content">
                {/* LOGO Y BOTÓN PARA EXPANDIR Y COLAPSAR */}
                <div className="upper-sidebar">
                    <div className="logo">
                        {/* Solo se muestra el logo si la barra está expandida */}
                        {expandida && <img src={Logo.src} alt="logo" />}
                        {/* Botón con evento para colapsar o expandir */}
                        <button onClick={toggleBarra} className="toggle-barra">
                            {expandida ? <BarraLateralIcon /> : <BarraDeslizadaIcon />} {/* Ícono que cambia según el estado */}
                        </button>
                    </div>

                    <article className="menu">
                        {/* HOME */}
                        <a href="/inicio" className="inicio">
                            <InicioIcon/>
                            {expandida && <span>Inicio</span>}
                        </a>

                        {/* PRODUCTOS */}
                        <a href="/productos">
                            <ProductosIcon/>
                            {expandida && <span>Productos</span>}
                        </a>

                        {/* FABRICANTES */}
                        <a href="/fabricantes">
                            <FabricantesIcon />
                            {expandida && <span>Fabricantes</span>}
                        </a>

                        {/* CLIENTES */}
                        <a href="/clientes">
                            <ClientesIcon />
                            {expandida && <span>Clientes</span>}
                        </a>

                        {/* REPORTE DE ANALISIS */}
                        <a href="/reporte">
                            <ReporteIcon />
                            {expandida && <span>Reporte de Analisis</span>}
                        </a>

                        {/* ESTADISTICAS */}
                        <a href="/estadisticas">
                            <EstadisticasIcon />
                            {expandida && <span>Estadisticas del Area</span>}
                        </a>

                        {/* GESTIÓN DE USUARIOS */}
                        <a href="/usuarios">
                            <UsuariosIcon />
                            {expandida && <span>Gestionar Usuarios</span>}
                        </a>
                    </article>
                </div>

                {/* BOTONES INFERIORES */}
                <article className="botones">
                    <a href="/perfil">
                        <PerfilIcon />
                        {expandida && <span>Perfil</span>}
                    </a>

                    <a href="/salir">
                        <CerrarSesionIcon />
                        {expandida && <span>Cerrar Sesion</span>}
                    </a>

                </article>
            </div>
        </aside>
    )
}