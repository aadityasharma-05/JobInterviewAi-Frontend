import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
            }
        } catch (err) {
            // Re-throw so Login.jsx can display the error message
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
            }
        } catch (err) {
            // Re-throw so Register.jsx can display the error message
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            // Even if logout API fails, clear user locally
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                // 401 = not logged in, that's fine
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}