import { useEffect, useState } from "react"
import { loadStoredCart } from "../components/utilities/fakedb";

const useCart = () => {
    const [cart, setCart] = useState([]);

     useEffect(() => {
        const storedCart = loadStoredCart();
        const savedCart = [];
        const keys = Object.keys(storedCart);
        //load data in cart id wise
        fetch('http://localhost:5000/productbykeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
        .then(res => res.json())
        .then(products => {
            for(const id in storedCart) {
                const addedProduct = products.find(product => product._id === id)
                if(addedProduct) {
                    const quantity = storedCart[id]
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
            }
                setCart(savedCart);
        })
    }, []);
    return [cart, setCart];
}

export default useCart;