import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils';
import './Login.css';

function Login({ setIsAuthenticated }) {

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); // clear error on typing
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return setError('Email and password are required.');
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, businessName, error: resError } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('businessName', businessName);
                if (typeof setIsAuthenticated === 'function') setIsAuthenticated(true);
                setTimeout(() => navigate('/home'), 800);
            } else if (resError) {
                setError(resError?.details?.[0]?.message || 'Something went wrong.');
            } else {
                setError(message || 'Login failed. Please try again.');
            }
        } catch {
            setError('Unable to connect. Please check your connection.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-page'>
            <div className='login-illustration'>
                <img src="/h.png" alt="Login Illustration" />
            </div>

            <div className='login-form-wrapper'>
                <h2>Welcome Back!</h2>
                <p className='subtitle'>Enter your credentials to access your account</p>

                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={loginInfo.email}
                            className={error ? 'input-error' : ''}
                        />
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={loginInfo.password}
                            className={error ? 'input-error' : ''}
                        />
                    </div>

                    {error && (
                        <div className='form-error-msg'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <button type='submit' className='login-btn' disabled={loading}>
                        {loading ? 'Signing in...' : 'Login'}
                    </button>

                    <div className='signup-text'>
                        Don't have an account?
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
