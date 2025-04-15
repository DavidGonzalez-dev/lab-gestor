export function requireAuth(context, next) {

    const {request, cookies, redirect} = context

    // Rutas publicas que no requieren autenticacion
    const publicRoutes = ["/", "/login", "/contrasena"]
    const url = new URL(request.url)

    // Verificamos si la ruta es publica
    const isPublic = publicRoutes.some(route => url.pathname === route || url.pathname.startsWith("/api/"))
    // Obtenemos la cookie de autenticacion
    const authToken = cookies.get("authToken")

    // Se verifica si un usuario autenticado esta 
    if(authToken && url.pathname === "/login") {
        return redirect("/dashboard")
    }

    // Se verifica si la ruta es publica
    if(isPublic) {
        return next()
    }

    // Se verifica si no esta autenticado el usuario
    if(!authToken) {
        return redirect("/login")
    }

    return next()
}
