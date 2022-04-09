import React, { useEffect, useState } from 'react';
// import { addToDb, loadStoredCart } from '../../../utilities/fakedb';
import { addToDb, loadStoredCart } from '../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import useProducts from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useState([]);
    
    //fetch data from database
    // useEffect(() => {
    //     fetch('/products.json')
    //     .then(res => res.json())
    //     .then(data => setProducts(data))
    // }, []);

    //load data from storage after reloading browser
    useEffect(() => {
        const storedCart = loadStoredCart();
        // console.log(storedCart)
        const savedCart = [];
        for(const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
            setCart(savedCart);
    }, [products]);
    //first step, will provide an empty array as data fetch is async task and second useEffect will execute before loading data; hence it will depend on 'products'; once data fetched, second useEffect will again call and find the product from products array; 

    const handleAddToCart = (selectedProduct) => {
        //check and update quantity of existing product in cart
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        //cart.push will not work here; copy the existing array elements and put those in new array and add new element will update the existing array;

        setCart(newCart);
        addToDb(selectedProduct.id);//storing product id and quantity into local storage
    } 
    //as cart component is same level as product component, event handler is defined at upper level component and sent as props to product component as cart component will be updated based on it; 

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>) 
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                   <Link to='/order'>
                       <button className='btn btn-success'>Order Review</button>
                   </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;