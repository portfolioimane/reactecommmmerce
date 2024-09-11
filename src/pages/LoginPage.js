// src/pages/LoginPage.js

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust import as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axiosInstance.post('/api/login', {
                email,
                password
            });

            // Store authentication token if needed (e.g., in localStorage)
            localStorage.setItem('token', response.data.token);

            // Redirect to the home page or another page after successful login
            navigate('/'); // Use navigate for redirection
        } catch (err) {
            setError('Invalid email or password.');
            console.error('Error during login:', err);
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="display-4 mb-4">Login</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </section>
    );
};

export default LoginPage;
