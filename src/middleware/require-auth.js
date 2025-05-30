import api from "@shared/services/api.js"

export async function requireAuth(context, next) {

    const { request, redirect } = context
    const authCookie = request.headers.get("cookie")

    // Rutas publicas que no requieren autenticacion
    const publicRoutes = ["/", "/login", "/contrasena", "/unauthorized"]

    // Acceso a las rutas privadas por rol
    const accessControl = {
        admin: ["/dashboard", "/usuarios", "/productos", "/clientes", "/fabricantes", "/recuentos"],
        analista: ["/dashboard", "/productos", "/clientes", "/fabricantes", "/recuentos"]
    }
    const url = new URL(request.url)

    // Verificamos si la ruta es publica
    const isPublic = publicRoutes.some(route => url.pathname === route || url.pathname.startsWith("/api/"))


    let isValid = false // Variable para verificar si el token es valido
    let userRole = null // Variable para guardar el rol del usuario

    // Obtenemos la cookie de autenticacion y verificamos
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
        console.log(error)
    }

    // ----------------
    // Validaciones
    // ----------------

    // Si ya se autentico e intenta ir a lofin, redirige a su dashboard
    if (isValid && url.pathname === "/login") {
        return redirect("/dashboard")
    }

    // Si la ruta es publica se salta las validaciones
    if (isPublic) {
        return next()
    }

    // Verificamos que el usuario autenticado tenga acceso a la ruta
    if (isValid) {
        // Obtenemos las rutas a las que el usuario tiene aceso
        const allowedRoutes = accessControl[userRole] || []

        // Verificar si la ruta actual esta permitida para el usuario
        const hasAccess = allowedRoutes.some(route => url.pathname.startsWith(route))

        //Redirigimos en caso de que el usuario no tenga acceso
        if (!hasAccess) {
            return redirect("/unauthorized")
        }
        return next()
    }

    return redirect("/login")
}   
