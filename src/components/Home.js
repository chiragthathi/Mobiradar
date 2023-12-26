import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import ShoppingCart from './ShoppingCart';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(Number.MAX_VALUE);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedRange, setSelectedRange] = useState([0, 0]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
          const data = await response.json();
          const productData = data.products;

          const prices = productData.map((product) => product.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);

          setMinPrice(min);
          setMaxPrice(max);
          setProducts(productData);
          setFilteredProducts(productData);
          setSelectedRange([min, max]);

        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceChange = (event, newValue) => {
    setSelectedRange(newValue);
    filterProductsByPrice(newValue[0], newValue[1]);
  };

  const filterProductsByPrice = (min, max) => {
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar products={products} setFilteredProducts={setFilteredProducts} />

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="categories-section">
            <h3>Fillter box</h3>
            <div className="price-range">
              <label htmlFor="priceRange" className="form-label">
                Price Range: ${selectedRange[0]} - ${selectedRange[1]}
              </label>
              <Slider
                getAriaLabel={() => 'Price range'}
                value={selectedRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
              />
            </div>
          </div>

          <ShoppingCart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} Cart={cartItems.length} />
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '-100px'}}>
          <h1><strong style={{ fontSize: '1.4em' }}>TOP PRODUCTS</strong></h1>
        </div>
        <div className="row" style={{ marginLeft: '90px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4" >
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src={product.images}
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite fallback loop
                    e.target.src = 'https://media.gqindia.com/wp-content/uploads/2016/07/QG-India-samsung-phone-android.jpg'; // Replace with your custom image URL
                  }}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)} // Trigger addToCart with the selected product
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
