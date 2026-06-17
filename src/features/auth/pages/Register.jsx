import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.")
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="auth-brand">
                <div className="brand-content">
                    <h1 className="brand-name">InterviewPrep<span>Ai</span></h1>
                    <p className="brand-tagline">
                        Ace your next technical interview with AI-powered insights, personalized mock questions, and an actionable roadmap.
                    </p>
                    
                    <div className="brand-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <span>Get a detailed Match Score</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <span>Tailored Technical Questions</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                            <span>30-Day Preparation Plan</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-wrapper">
                <div className="form-container">
                    <h1>Create Account</h1>
                    <p>Sign up to start preparing with AI</p>

                    {error && (
                        <div className="form-error" style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            color: '#f87171',
                            padding: '0.875rem 1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username'
                                value={username}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter email address'
                                value={email}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Enter password'
                                value={password}
                            />
                        </div>

                        <button className='button primary-button' type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p style={{ marginTop: '1rem' }}>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register