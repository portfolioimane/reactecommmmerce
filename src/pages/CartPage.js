// src/pages/CartPage.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust import as needed

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axiosInstance.get('/api/cart');
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await axiosInstance.delete(`/api/cart/${itemId}`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            setError('Failed to remove item.');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="display-4 mb-4">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="lead">Your cart is currently empty.</p>
                ) : (
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={`http://localhost/storage/images/${item.product.image}`} className="img-thumbnail" alt={item.product.name} style={{ width: '100px' }} />
                                            {item.product.name}
                                        </td>
                                        <td>{item.price.toFixed(2)} MAD</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toFixed(2)} MAD</td>
                                        <td>
                                            <button onClick={() => handleRemove(item.id)} className="btn btn-danger btn-sm">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <h3 className="mb-0">Total: {calculateTotal()} MAD</h3>
                            <a href="/checkout" className="btn btn-success btn-lg">Proceed to Checkout</a>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CartPage;
