import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils';
import './Login.css';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, businessName } = signupInfo;
        if (!name || !email || !password || !confirmPassword || !businessName) {
            return setError('All fields are required.');
        }
        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }
        setLoading(true);
        setError('');
        try {
            const { confirmPassword: _, ...signupData } = signupInfo;
            const response = await fetch(`http://localhost:8000/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();
            const { success, message, error: resError } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 800);
            } else if (resError) {
                setError(resError?.details?.[0]?.message || 'Something went wrong.');
            } else {
                setError(message || 'Signup failed. Please try again.');
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
                <img src="/h.png" alt="Signup Illustration" />
            </div>

            <div className='login-form-wrapper'>
                <h2>Create Account</h2>
                <p className='subtitle'>Enter your details to get started</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your full name'
                            value={signupInfo.name}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={signupInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor='businessName'>Business Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='businessName'
                            placeholder='Enter your business name'
                            value={signupInfo.businessName}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Create a password'
                            value={signupInfo.password}
                        />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm your password'
                            value={signupInfo.confirmPassword}
                            className={error && signupInfo.confirmPassword && signupInfo.password !== signupInfo.confirmPassword ? 'input-error' : ''}
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
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>

                    <div className='signup-text'>
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
