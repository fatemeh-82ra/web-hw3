import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { handleLogin } = useContext(AppContext);

    const submitLogin = (e) => {
        e.preventDefault();
        setError('');
        handleLogin(username, password).catch(err => {
            setError('Invalid username or password.');
        });
    };

    return (
        <div className="login-container">
            <form onSubmit={submitLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// Add some basic styling in App.css
// .login-container { display: flex; justify-content: center; align-items: center; height: 100vh; }
// form { padding: 2rem; border: 1px solid #ccc; border-radius: 8px; }

export default Login;