import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Shipment = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    const handleNameBlur = (e) => {
        setName(e.target.value);
    }

    const handleAddressBlur = (e) => {
        setAddress(e.target.value);
    }

    const handlePhoneNumberBlur = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleCreateUser = (e) => {
        e.preventDefault();
    }
    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Shipping Information</h2>
                <form onSubmit={handleCreateUser}>
                    <div className="input-group">
                        <label htmlFor="name">Your Name</label>
                        <input onBlur={handleNameBlur} type="text" name="name" id="name" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input style={{color:'GrayText'}} value={user?.email} readonly type="email" name="email" id="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="text">Address</label>
                        <input onBlur={handleAddressBlur} type="text" name="address" id="address" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone number">Phone Number</label>
                        <input onBlur={handlePhoneNumberBlur} type="text" name="phone number" id="phone number" required />
                    </div>
                    <p style={{color: 'red'}}>{error.message}</p>
                    <input className='form-submit' type="submit" value="Add Shipping" />
                </form>
            </div>
        </div>
    );
};

export default Shipment;