import { requireAuth } from "middleware/require-auth"

export const onRequest = async (context, next) => {
    return requireAuth(context, next)
}