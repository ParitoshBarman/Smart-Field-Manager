import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/atenticationform.css'

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //   const [error, setError] = useState('');
    //   const navigate = useNavigate();



    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    const fetchcredentialsLocal = () => {
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (credentials) {
            setEmail(credentials.email)
            setPassword(credentials.password)            
        }
    }

    useEffect(()=>{
        fetchcredentialsLocal();
    }, [])

    return (
        <div className='loginpage'>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    {/* {error && <p className="error">{error}</p>} */}
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
