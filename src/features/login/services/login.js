import api from "@shared/services/api"

const login = async (data) => {
    try {
        const response = await api.post(
            "/login",
            data
        )

        return true

    } catch (err) {
        console.log(err)
        return false
    }
}

export default login