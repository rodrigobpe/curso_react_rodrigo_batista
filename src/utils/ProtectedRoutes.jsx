import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks";
import { useEffect, useState } from "react";

export const ProtectedRoutes = () => {
    const { user, verifyToken } = useLogin()
    const token = localStorage.getItem("token")
    const [isValidToken, setIsValidToken] = useState(undefined)

    useEffect(() => {
        verifyToken(token).then(data => setIsValidToken(data))
    }, [])

    if (isValidToken == undefined) return
    if (isValidToken == false) {
        return <Navigate to={"/login"} />
    }
    return <Outlet />

}