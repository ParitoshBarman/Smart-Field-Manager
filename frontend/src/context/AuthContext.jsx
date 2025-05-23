import { useState, createContext, useContext, Children } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loginStatus, setLoginStatus] = useState(false);
    const [BusinessList, setBusinessList] = useState([]);
    const [error, setError] = useState(false);
    const [mapCenterForMult, setmapCenterForMult] = useState([]);

    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            // const res = await axios.post("http://localhost:5000/api/auth/login", credentials)
            const res = await axios.post(`${API_URL}/api/users/login`, credentials)
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("credentials", JSON.stringify(credentials));
            setLoginStatus(true);
            setError(false);
            navigate("/")

        }
        catch (error) {
            console.error("Login failed", error);
            setError(true);
            setLoginStatus(false);
        }
    }

    const register = async (details) => {
        try {
            await axios.post(`${API_URL}/api/users/register`, details);
            setError(false);
            navigate("/login")
        }
        catch (error) {
            console.error("Registration failed", error);
            setError(true);
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
            const res = await axios.get(`${API_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data.user)
            setUser(res.data.user);
            setError(false);

        }
        catch (error) {
            console.error("Failed to fetch profile", error);
            setError(true);
            setLoginStatus(false);
            if(error.response.data.message=="Invalid token"){
                navigate("/login");
            }
        }
    }

    const uploadFormData = async (formData)=>{
        try{
            let options = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
            const res = await axios.post(`${API_URL}/api/contact/submit`, formData, options)
            console.log(res)
            setError(false);
            navigate("/")
        }
        catch(error){
            console.log(error)
            setError(true);
            setLoginStatus(false);
            if(error.response.data.message=="Invalid token"){
                navigate("/login");
            }
        }
    }

    const fetchBusinessList = async () => {
        // console.log("fetchBusinessList calling")
        try {
            const res = await axios.get(`${API_URL}/api/contact/todaysvisit`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(res.data)
            let ccccenter = res.data.map((ele)=>{
                return [ele.location.split(",")[0].trim(), ele.location.split(",")[1].trim()]
            })
            setBusinessList(res.data);
            setmapCenterForMult(getCenter(ccccenter));
            setError(false);

        }
        catch (error) {
            setError(true);
            setLoginStatus(false);
            console.log(error.response.data.message)
            console.error("Failed to fetch profile", error);
            if(error.response.data.message=="Invalid token"){
                navigate("/login");
            }
        }
    }

    const getCenter = (locations) => {
        if (locations.length === 0) return null;
    
        let sumLat = 0, sumLng = 0;
        locations.forEach(([lat, lng]) => {
          sumLat += lat;
          sumLng += lng;
        });
    
        return [sumLat / locations.length, sumLng / locations.length];
      };
    

    return (
        <AuthContext.Provider value={{login, register, logout, fetchProfile, uploadFormData, fetchBusinessList, setBusinessList, setError, error, BusinessList, token, user, loginStatus, mapCenterForMult}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=> useContext(AuthContext);