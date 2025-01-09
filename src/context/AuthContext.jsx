import { useState, createContext, useContext, Children } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials)
            setToken("token", res.data.token);
            localStorage.setItem("token", res.data.token);
            setLoginStatus(true);
            navigate("/")

        }
        catch (error) {
            console.error("Login failed", error);
        }
    }

    const register = async (details) => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", details);
            navigate("/login")
        }
        catch (error) {
            console.error("Registration failed", error);
        }
    }

    const logout = () => {
        setUser(null);
        setLoginStatus(false);
        setToken("");
        localStorage.removeItem("token");
        navigate("/login")
    }

    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data.user);

        }
        catch (error) {
            console.error("Failed to fetch profile", error);
        }
    }

    return (
        <AuthContext.Provider value={{login, register, logout, fetchProfile, token, user, loginStatus}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=> useContext(AuthContext);