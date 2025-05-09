import api from "@shared/services/api.js"

export async function requireAuth(context, next) {

    const { request, redirect } = context
    const authCookie = request.headers.get("cookie")

    // Rutas publicas que no requieren autenticacion
    const publicRoutes = ["/", "/login", "/contrasena"]
    const url = new URL(request.url)

    // Verificamos si la ruta es publica
    const isPublic = publicRoutes.some(route => url.pathname === route || url.pathname.startsWith("/api/"))

    let isValid = false
    // Obtenemos la cookie de autenticacion y verificamos
    try {
        const response = await api.get("/validar-token", {
            headers: {
                Cookie: authCookie
            }
        })

        isValid = response.data.data.valid

    } catch (error) {
        console.log(error)
    }

    // ----------------
    // Validaciones
    // ----------------
    if(isValid && url.pathname === "/login") {
        return redirect("/dashboard")
    }

    if(isPublic || isValid){
        return next()
    }

    return redirect("/login")
}   
