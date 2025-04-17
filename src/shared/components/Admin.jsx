import { useState } from "react";
import BarraLateral from "@iconos/barraLateral"
import BarraDeslizada from "@iconos/barraDeslizada";
import HomeIcon from "@iconos/homeIcon"
import Productos from "@iconos/productos"
import Fabricantes from "@iconos/fabricantes"
import Clientes from "@iconos/clientes"
import Reporte from "@iconos/reporte"
import Estadisticas from "@iconos/estadisticas"
import Usuarios from "@iconos/usuarios"
import Perfil from "@iconos/perfil"
import CerrarSesion from "@iconos/cerrarSesion"
import "./admin.css"


export default function BarraExpandida(){ 
    // Estado para controlar si está expandida o colapsada
    const [expandida, setExpandida] = useState(true); 

    const toggleBarra = () => {
        // Cambia el estado al hacer clic
        setExpandida(!expandida); 
    }

    return(
        <header className={`admin ${expandida ? "expandida" : "colapsada"}`}> {/* Clase dinámica */}
            <div className="container">
                {/* LOGO Y BOTÓN PARA EXPANDIR Y COLAPSAR */}
                <div className="logo">
                    {/* Solo se muestra el logo si la barra está expandida */}
                    {expandida && <img src="/assets/logo/logo-nav.svg" alt="logo" />}
                    {/* Botón con evento para colapsar o expandir */}
                    <button onClick={toggleBarra} className="toggle-barra">
                        {expandida ? <BarraLateral /> : <BarraDeslizada />} {/* Ícono que cambia según el estado */}
                    </button>
                </div>
               
                <article className="menu">
                    {/* HOME */}
                    <a href="/inicio" className="inicio">
                        <HomeIcon className="icono"/>
                        {expandida && <span>Inicio</span>}
                    </a>

                    {/* PRODUCTOS */}
                    <a href="/productos" className="productos">
                        <Productos />
                        {expandida && <span>Productos</span>}
                    </a>

                    {/* FABRICANTES */}
                    <a href="/fabricantes" className="fabricantes">
                        <Fabricantes />
                        {expandida && <span>Fabricantes</span>}
                    </a>

                    {/* CLIENTES */}
                    <a href="/clientes" className="clientes">
                        <Clientes />
                        {expandida && <span>Clientes</span>}
                    </a>

                    {/* REPORTE DE ANALISIS */}
                    <a href="/reporte" className="reporteAnalisis">
                        <Reporte />
                        {expandida && <span>Reporte de Analisis</span>}
                    </a>

                    {/* ESTADISTICAS */}
                    <a href="/estadisticas" className="estadisticas">
                        <Estadisticas />
                        {expandida && <span>Estadisticas del Area</span>}
                    </a>

                    {/* GESTIÓN DE USUARIOS */}
                    <a href="/usuarios" className="usuarios">
                        <Usuarios />
                        {expandida && <span>Gestionar Usuarios</span>}
                    </a>
                </article>

                {/* BOTONES INFERIORES */}
                <article className="botones">
                    <a href="/perfil">
                    <Perfil />
                    {expandida && <h3>Perfil</h3>}
                    </a>
                
                    <a href="/salir">
                        <CerrarSesion />
                        {expandida && <h3>Cerrar Sesion</h3>}
                    </a>
                   
                </article>
            </div>
        </header>
    )
}

