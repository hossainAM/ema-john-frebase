import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import {signOut} from 'firebase/auth';
// import logo from '../../images/Logo.svg';
import logo from '../../images/Sundorima-01.png'
import './Header.css';

const Header = () => {
    const [user] = useAuthState(auth);

    const logOut = () => {
        signOut(auth);
    };
    
    return (
        <nav className='header'>
            <img className='w-20 h-75' src={logo} alt="" />
            <div>
                <Link to='/shop'>Shop</Link>
                <Link to='/order'>Order</Link>
                <Link to='/inventory'>Inventory</Link>
                <Link to='/about'>About</Link>
                {user 
                ? 
                <Link onClick={logOut} to='/login'>LogOut</Link>
                :
                <Link to='/login'>Login</Link>
                }
            </div>
        </nav>
    );
};

export default Header;