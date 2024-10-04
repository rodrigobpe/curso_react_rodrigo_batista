import { useState } from "react"

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [loginForms, setLoginForms] = useState({ email: '', password: '' })
    const [signUpForm, setSignUpForms] = useState({ email: '', password: '', name: '' })
    const [user, setUser] = useState(() => {
        const userLocalStorage = localStorage.getItem("user")
        return userLocalStorage ? JSON.parse(userLocalStorage) : null
    })

    const resetForms = () => {
        setLoginForms(prev => prev = { ...prev, email: '', password: '' })
    }

    const authLogin = async ({ email, password }) => {
        const res = await fetch(`${process.env.BASE_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ email, password })
            }
        )

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }

        const { name, id, token } = data.data

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify({ id, name, email: data.data.email }))
        return { error: false }
    }

    const signUp = async ({ email, password, name }) => {
        const res = await fetch(`${process.env.BASE_URL}/auth/register`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ email, password, name })
            }
        )

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }

        return { error: false }
    }

    const verifyToken = async (token) => {
        const res = await fetch(`${process.env.BASE_URL}/auth/verify`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ token })
            }
        )

        const data = await res.json()

        return data.data
    }


    const logout = (navigate) => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        setUser(null)
        return navigate("/login")
    }

    return {
        loading,
        setLoading,
        loginForms,
        resetForms,
        authLogin,
        user,
        logout,
        verifyToken,
        signUpForm,
        signUp
    }
}