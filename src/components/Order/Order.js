import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../utilities/fakedb';
import './Order.css';

const Order = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const navigate = useNavigate();

     const removeItem = (product) => {
        const rest = cart.filter(pd => pd.id !== product.id);
        setCart(rest);
        removeFromDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItem key={product.id} product={product} removeItem={() => removeItem(product)}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {/* <Link to='/inventory'>
                        <button className='btn btn-danger'>Proceed Checkout</button>
                    </Link>
                    Or... */}
                    <button onClick={() => navigate('/inventory')} className='btn btn-danger'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;
