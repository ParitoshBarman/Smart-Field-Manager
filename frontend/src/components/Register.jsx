import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/atenticationform.css'

const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ username, email, password });
    };

    return (
        <div className='loginpage'>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
