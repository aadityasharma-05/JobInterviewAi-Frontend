import axios from "axios"

// No baseURL — uses relative paths so Vite proxy forwards /api/* to the backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data
    } catch (err) {
        // Re-throw so the hook/component can handle it
        const message = err.response?.data?.message || "Registration failed. Please try again."
        throw new Error(message)
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        })
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data
    } catch (err) {
        const message = err.response?.data?.message || "Login failed. Please check your credentials."
        throw new Error(message)
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout")
        localStorage.removeItem("token")
        return response.data
    } catch (err) {
        // Logout failure is non-critical; just remove token and return null
        localStorage.removeItem("token")
        return null
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data
    } catch (err) {
        // 401 is expected when not logged in — not an error worth logging
        if (err.response?.status !== 401) {
            console.error("getMe API Error:", err)
        }
        throw err
    }
}