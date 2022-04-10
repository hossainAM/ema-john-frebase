import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;
    const navigate = useNavigate();
    const location = useLocation();

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleEmailBlur = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordBlur = (e) => {
        setPassword(e.target.value);
    }

    const handleSignInUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    const from = location.state?.from?.pathname || "/";

    if(user){
        navigate(from);
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleSignInUser}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmailBlur} type = "email"
                        name = "email"
                        id = "email"
                        required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePasswordBlur} type = "password"
                        name = "password"
                        id = "password"
                        required />
                    </div>
                    <p style={{color: 'red'}}>{error?.message}</p>
                    {
                        loading && 'loading....'
                    }<br/>
                    <input className='form-submit' type="submit" value="Login" required/>
                </form>
                <p>
                    New to Ema-John? <Link className='form-link' to='/signup'>Create New Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;