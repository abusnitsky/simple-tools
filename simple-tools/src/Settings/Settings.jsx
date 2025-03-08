import React, { useState, useEffect } from 'react';
import { login, register, logout, checkAuth } from '../utils/auth.js';
import API from '../utils/api.js';

const Settings = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);
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
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        try {
            const res = await register(username, password);
            console.log(res.status);
            if (res.status === 201) {
                setRegisterView(false);
                setMessage("Registration successful!");
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
            <div className='mt-2 flex flex-col gap-2 max-w-full min-w-sm h-full'>
                <div>
                    {loggedIn === false && registerView === false &&
                        <form onSubmit={handleLogin}
                            className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg my-2'>
                            <input type='text' className='ring px-2 pb-1 rounded-sm'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <input type='password' className='ring px-2 pb-1 rounded-sm'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <div className='flex justify-between'>
                                <button className='bg-blue-800 text-white px-2 pb-1 rounded-sm'>Login</button>

                                <button className='ring px-2 pb-1 rounded-sm'
                                    onClick={() => setRegisterView(true)}>Registration</button>
                            </div>
                            <div>{message}</div>
                        </form>
                    }
                    {registerView === true && loggedIn === false &&
                        <form onSubmit={handleRegister}
                            className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg my-2'>
                            <label>Enter username:</label>
                            <input type='text' className='ring px-2 pb-1 rounded-sm'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <label className='mt-1'>Enter and confirm password:</label>
                            <input type='password' className='ring px-2 pb-1 rounded-sm'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <input type='password' className='ring px-2 pb-1 rounded-sm'
                                placeholder='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <div className='flex justify-between'>
                                <button className='bg-blue-800 text-white px-2 pb-1 rounded-sm max-w-fit'>Register</button>
                                <div>{message}</div>
                            </div>

                        </form>
                    }
                    {loggedIn === true && registerView === false &&
                        <div className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg my-2'>
                            <div>{user ? <div>Logged in as <span className='font-semibold text-lg'>{user.username}</span> </div>
                                : <div>Loading...</div>}</div>
                            <button className='ring rounded-sm px-2 pb-1 max-w-fit' onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Settings;