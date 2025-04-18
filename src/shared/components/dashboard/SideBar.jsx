import { useState } from "react";

import { BarraLateral, BarraDeslizada, Clientes, Fabricantes } from "@shared/iconos";
import Logo from "../../../../public/assets/logo/logo-nav.svg"

import Home from "@iconos/homeIcon"
import Productos from "@iconos/productos"
import Reporte from "@iconos/reporte"
import Estadisticas from "@iconos/estadisticas"
import Usuarios from "@iconos/usuarios"
import Perfil from "@iconos/perfil"
import CerrarSesion from "@iconos/cerrarSesion"
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
                            {expandida ? <BarraLateral /> : <BarraDeslizada />} {/* Ícono que cambia según el estado */}
                        </button>
                    </div>

                    <article className="menu">
                        {/* HOME */}
                        <a href="/inicio" className="inicio">
                            <Home/>
                            {expandida && <span>Inicio</span>}
                        </a>

                        {/* PRODUCTOS */}
                        <a href="/productos">
                            <Productos/>
                            {expandida && <span>Productos</span>}
                        </a>

                        {/* FABRICANTES */}
                        <a href="/fabricantes">
                            <Fabricantes />
                            {expandida && <span>Fabricantes</span>}
                        </a>

                        {/* CLIENTES */}
                        <a href="/clientes">
                            <Clientes />
                            {expandida && <span>Clientes</span>}
                        </a>

                        {/* REPORTE DE ANALISIS */}
                        <a href="/reporte">
                            <Reporte />
                            {expandida && <span>Reporte de Analisis</span>}
                        </a>

                        {/* ESTADISTICAS */}
                        <a href="/estadisticas">
                            <Estadisticas />
                            {expandida && <span>Estadisticas del Area</span>}
                        </a>

                        {/* GESTIÓN DE USUARIOS */}
                        <a href="/usuarios">
                            <Usuarios />
                            {expandida && <span>Gestionar Usuarios</span>}
                        </a>
                    </article>
                </div>

                {/* BOTONES INFERIORES */}
                <article className="botones">
                    <a href="/perfil">
                        <Perfil />
                        {expandida && <span>Perfil</span>}
                    </a>

                    <a href="/salir">
                        <CerrarSesion />
                        {expandida && <span>Cerrar Sesion</span>}
                    </a>

                </article>
            </div>
        </aside>
    )
}

