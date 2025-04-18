import { requireAuth } from "middleware/require-auth"

export const onRequest = async (context, next) => {
    return await requireAuth(context, next)
}