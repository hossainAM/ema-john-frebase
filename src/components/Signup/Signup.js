import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword, loading, hooksError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth);

    const handleEmailBlur = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordBlur = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassBlur = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleCreateUser = (e) => {
        e.preventDefault();
        // if(password !== confirmPassword){
        //     setError('Your password did not match')
        //     return;
        // }
        if(password.length < 6) {
            setError('Password length should be minimum 6')
            return;
        }
        createUserWithEmailAndPassword(email, password)
    }

    if(user){
        navigate('/shop');
    }

    return (
            <div className='form-container'>
            <div>
                <h2 className='form-title'>Sign Up</h2>
                <form onSubmit={handleCreateUser}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmailBlur} type="email" name="email" id="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePasswordBlur} type="password" name="password" id="password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input onBlur={handleConfirmPassBlur} type="password" name="confirm-password" id="confirm-password" required />
                    </div>
                    <p style={{color: 'red'}}>{error}</p>
                    <p style={{color:'red'}}>{hooksError?.message}</p>
                    {
                        loading && 'loading...'
                    }<br/>
                    <input className='form-submit' type="submit" value="Sign Up" />
                </form>
                <p>
                    Already have an account? <Link className='form-link' to='/login'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;