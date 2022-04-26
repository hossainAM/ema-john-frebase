import React, { useEffect, useState } from 'react';
import { addToDb, loadStoredCart } from '../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
// import useProducts from '../../hooks/useProducts';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    const [cart, setCart] = useState([]);
    //pagination
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [products, setProducts] = useState([]);

    //load products page and size wise
    useEffect(() => {
        fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [page, size]);

    //for pagination
    useEffect(() => {
        fetch('http://localhost:5000/productcount')
        .then(res => res.json())
        .then(data => {
            const count = data.count;
            const pages = Math.ceil(count/10);
            setPageCount(pages);
        })
    }, [])

    //load data from storage after reloading browser
    useEffect(() => {
        const storedCart = loadStoredCart();
        // console.log(storedCart)
        const savedCart = [];
        for(const id in storedCart) {
            const addedProduct = products.find(product => product._id === id)
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
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        //cart.push will not work here; copy the existing array elements and put those in new array and add new element will update the existing array;

        setCart(newCart);
        addToDb(selectedProduct._id);//storing product id and quantity into local storage
    } 
    //as cart component is same level as product component, event handler is defined at upper level component and sent as props to product component as cart component will be updated based on it; 

    return (
        <>
        <div className='shop-container mb-6'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product._id}
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
        <div className='pagination d-flex justify-content-center'>
            {
                [...Array(pageCount).keys()].map(number => <button
                className={page === number ? 'selected' : ''}
                onClick={() => setPage(number)}
                >{number + 1}</button>)
            }
            <select onChange={(e) => setSize(e.target.value)}>
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </div>
        </>
    );
};

export default Shop;