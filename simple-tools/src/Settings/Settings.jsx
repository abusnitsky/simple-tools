import React, { useState, useEffect } from 'react';
import { login, register, logout, checkAuth } from '../utils/auth.js';
import API from '../utils/api.js';

const Settings = () => {
    //const loginViewState = ['login', 'register', 'logout'];
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    //const [loginView, setLoginView] = useState(loginViewState[0]);
    const [registerView, setRegisterView] = useState(false);
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            console.log(res.status);
            if (res?.status === 200) {
                setLoggedIn(true);
            } else if (res?.status === 400) {
                setMessage(res.data.message);
            }
        } catch (error) {

            console.error("Login failed", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await register(username, password);
            console.log(res.status);
            if (res.status === 201) {
                setRegisterView(false);
            }
            if (res.status === 400) {
                setMessage(res.data.message);
            }
        } catch (error) {
            console.error("Register failed", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setLoggedIn(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            API.get("/profile")
                .then((res) => setUser(res.data))
                .catch((err) => console.error("Not authenticated", err));
        }
    }, [loggedIn]);

    useEffect(() => {
        checkAuth().then(setLoggedIn);
    }, []);

    return (
        <div className='flex justify-center bg-gray-200'>
            <div className='mt-2 flex flex-col gap-2'>
                <div>
                    {loggedIn === false && registerView === false &&
                        <form onSubmit={handleLogin}
                            className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg my-2'>
                            <label>Username:</label>
                            <input type='text' className='ring'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <label>Password:</label>
                            <input type='password' className='ring'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button className='ring'>Login</button>
                            <button className='hover:underline'
                                onClick={() => setRegisterView(true)}>Register</button>
                            <div>{message}</div>
                        </form>
                    }
                    {registerView === true && loggedIn === false &&
                        <form onSubmit={handleRegister}
                            className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg my-2'>
                            <label>Username:</label>
                            <input type='text' className='ring'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <label>Password:</label>
                            <input type='password' className='ring'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button className='ring'>Register</button>
                            <div>{message}</div>
                        </form>
                    }
                    {loggedIn === true && registerView === false &&
                        <div>
                            <div>{user ? <div>{user.message}!</div> : <div>Loading...</div>}</div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Settings;