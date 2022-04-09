import { useEffect, useState } from "react"
import { loadStoredCart } from "../components/utilities/fakedb";

const useCart = (products) => {
    const [cart, setCart] = useState([]);

     useEffect(() => {
        const storedCart = loadStoredCart();
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
    return [cart, setCart];
}

export default useCart;