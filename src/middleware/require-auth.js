import api from "@shared/services/api.js"

export async function requireAuth(context, next) {

    const { request, redirect } = context
    const authCookie = request.headers.get("cookie")
    
    const url = new URL(request.url)

    // Lista de todas tus rutas válidas (páginas existentes en /pages)
    const allRoutes = [
        "/", "/login", "/recuperacion-contraseña", "/unauthorized",
        "/dashboard", "/productos", "/clientes", "/fabricantes", "/recuentos", "/usuarios"
    ]

    const isExistingRoute = allRoutes.some(route => url.pathname === route || url.pathname.startsWith(route + "/"))

    // Si no es una ruta conocida, no aplicamos redirección, dejamos que Astro sirva el 404
    if (!isExistingRoute) {
        return next()
    }

    // DEFINICION DE LAS RUTAS PUBLICAS QUE NO REQUIEREN AUTENTICACION
    const publicRoutes = ["/login", "/recuperacion-contrase%C3%B1a", "/unauthorized", "/fav.ico"]

    // DEFINCION DE LAS RUTAS PRIVADAS PRO ROL
    const accessControl = {
        admin: ["/dashboard", "/productos", "/clientes", "/fabricantes", "/recuentos", "/usuarios", ...publicRoutes],
        analista: ["/dashboard", "/productos", "/clientes", "/fabricantes", "/recuentos", ...publicRoutes]
    }



    // Verificamos si la ruta es publica
    const isPublic = url.pathname == "/" || publicRoutes.some(route => url.pathname.startsWith(route))

    if (!isPublic && !authCookie) {
        return redirect("/unauthorized")
    }

    // Verificamos que el usuario tenga un token de autenticacion valido

    let isValid = false // Variable para verificar si el token es valido
    let userRole = null // Variable para guardar el rol del usuario

    if (authCookie) {
        try {
            const response = await api.get("/validar-token", {
                headers: {
                    Cookie: authCookie
                }
            })
            isValid = response.data.data.valid
            userRole = response.data.data.rol
        }
        // En caso de haber un error se hace un log en la consola del servidor
        catch (error) {
            if (error.response) {
                console.error(error.response.data)
            }
            else {
                console.error("Error al conectarse al servidor: ", error)
            }
        }
    }

    // Verificamos que el usuario tenga los permisos necesarios para ingresar a la ruta
    if (isValid) {

        // Si el usuario esta intentando ingresar al login se le redirige al dashboard directamente
        if (url.pathname === "/login") {
            return redirect("dashboard")
        }

        const allowedRoutes = accessControl[userRole] || []
        const hasAccess = allowedRoutes.some(route => url.pathname.startsWith(route))

        if (!hasAccess && !isPublic) {
            return redirect("/unauthorized")
        }
        return next()
    }

    return next()

}   
