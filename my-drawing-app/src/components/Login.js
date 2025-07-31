import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Login() {
    const [username, setUsername] = useState('');
    const { handleLogin } = useContext(AppContext);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username) {
            setError('Username cannot be empty.');
            return;
        }
        const success = await handleLogin(username);
        if (!success) {
            setError("Login failed. Please use 'user1' or 'user2'.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Drawing App Login</h2>
                <p>Default users are 'user1' and 'user2'</p>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;