import { NotificacionIcon, PerfilIcon } from "@shared/iconos";  
import Logo from "../../../../public/assets/logo/logo-nav.svg"
import "./Search.css"

export function SearchBar(){
    return (
            <aside className="ContenedorPrincipal"> 
                <div className="BarraBusqueda">
                    {/* ICONOS DE NOTIFICACIONES Y PERFIL */}
                    <div className="iconos">
                    <a href="notoficacion" className="notificacion">
                        <NotificacionIcon/>
                    </a>
                    <a href="perfil" className="perfil">
                        <PerfilIcon/>
                    </a>
                    </div>
                    {/* IMAGEN DEL LOGO */}
                    <div className="logoBarraNavegacion">
                        <img src={Logo.src} alt="logo" />
                    </div>
                </div>
            </aside>
        )
}