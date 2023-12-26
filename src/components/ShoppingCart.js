import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, removeFromCart }) => {
    const [showCart, setShowCart] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    const totalQuantity = cartItems.length; // Total number of items in the cart

    return (
        <div className="shopping-cart-container">
            <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon
                    onClick={() => setShowCart(true)}
                    style={{ cursor: 'pointer', fontSize: '2rem', color: 'white' }}
                />
            </Badge>

            <div className={`modal ${showCart ? 'show' : ''}`} style={{ display: showCart ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Shopping Cart</h5>
                            <button type="button" className="btn-close" onClick={() => setShowCart(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {cartItems.length === 0 ? (
                                <p>No items in the cart</p>
                            ) : (
                                <ul>
                                    {Array.from(new Set(cartItems.map((item) => item.title))).map((title, index) => {
                                        const itemsWithTitle = cartItems.filter((item) => item.title === title);
                                        const totalQuantity = itemsWithTitle.length;
                                        const item = itemsWithTitle[0]; // Get the first item with the same title

                                        return (
                                            <li key={index} style={{ listStyleType: 'none' }}>
                                                <div>
                                                    <img
                                                        src={item.images}
                                                        className="card-img-top"
                                                        onError={(e) => {
                                                            e.target.onerror = null; // Prevent infinite fallback loop
                                                            e.target.src = 'https://media.gqindia.com/wp-content/uploads/2016/07/QG-India-samsung-phone-android.jpg'; // Replace with your custom image URL
                                                        }}
                                                        alt={item.title}
                                                        style={{ width: '50px' }}
                                                    />
                                                    <span>{item.title}</span>
                                                    <span>${item.price} (Quantity: {totalQuantity})</span>
                                                    <button onClick={() => removeFromCart(cartItems.indexOf(item))}>Remove</button>


                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            <p>Total Price: ${totalPrice}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowCart(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
