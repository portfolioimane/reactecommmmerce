// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust import as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axiosInstance.post('/api/register', {
                name,
                email,
                password
            });

            setSuccessMessage('Registration successful! Please log in.');
            
            // Redirect to the login page after successful registration
            setTimeout(() => {
                navigate('/login'); // Use navigate to redirect
            }, 2000); // Redirect after 2 seconds to allow the success message to be seen
        } catch (err) {
            setError('Failed to register. Please try again.');
            console.error('Error during registration:', err);
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="display-4 mb-4">Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

                {error && <p className="text-danger mt-3">{error}</p>}
                {successMessage && <p className="text-success mt-3">{successMessage}</p>}
            </div>
        </section>
    );
};

export default RegisterPage;
