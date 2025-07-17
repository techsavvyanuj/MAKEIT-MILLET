import React, { useState, useEffect } from "react";
import axios from "axios";
import { dotWave } from "ldrs";

dotWave.register();

const Product = () => {
  const [tableData, setTableData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://prashilexports.onrender.com/productdashboard"
        );
        setTableData(
          Array.isArray(response.data.photos) ? response.data.photos : []
        );
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    const productWithPrice = {
      ...product,
      price: Math.floor(Math.random() * 500) + 100
    };
    
    if (existingItem) {
      updateQuantity(product._id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...productWithPrice, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item._id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const filteredProducts = sortProducts(tableData.filter(product => {
    const matchesSearch = product.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }));

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item._id === product._id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setShowQuickView(false);
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name":
        return [...products].sort((a, b) => a.caption.localeCompare(b.caption));
      default:
        return products;
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Shop
          </h5>
          <h1 className="mb-4">Our Premium Products</h1>
          <p className="text-muted">Discover our collection of authentic Indian spices, oils, and handicrafts</p>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="spices">Spices</option>
              <option value="oils">Oils</option>
              <option value="handicrafts">Handicrafts</option>
              <option value="agricultural">Agricultural Products</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button
              className="btn btn-outline-primary position-relative"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="fa fa-shopping-cart"></i> Cart
              {getTotalItems() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              className="btn btn-outline-danger position-relative"
              onClick={() => setShowWishlist(!showWishlist)}
            >
              <i className="fa fa-heart"></i> Wishlist
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Shopping Cart Modal */}
        {showCart && (
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Shopping Cart</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCart(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        {item.image && item.image.url && (
                          <img
                            src={item.image.url}
                            alt={item.caption}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            className="rounded me-3"
                          />
                        )}
                        <div>
                          <h6 className="mb-0">{item.caption.slice(0, 30)}...</h6>
                          <small className="text-muted">₹{item.price}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary me-3"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h5>Total: ₹{getTotalPrice()}</h5>
                    <button className="btn btn-success">
                      <i className="fa fa-credit-card me-2"></i>Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isloading ? (
          <div className="text-center" disabled={isloading}>
            <l-dot-wave size="47" speed="1" color="black"></l-dot-wave>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <div className="col-12 text-center">
                <p className="text-muted">No products found matching your criteria.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="col-lg-4 col-md-6">
                  <div className="card h-100 shadow-sm product-card">
                    <div className="position-relative">
                      {product.image && product.image.url ? (
                        <img
                          className="card-img-top"
                          src={product.image.url}
                          alt={product.caption}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="card-img-top d-flex align-items-center justify-content-center bg-light"
                          style={{ height: "250px" }}
                        >
                          <i className="fa fa-image fa-3x text-muted"></i>
                        </div>
                      )}
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-primary">New</span>
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.caption.slice(0, 50)}...</h5>
                      <p className="card-text text-muted flex-grow-1">
                        {product.caption.slice(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                          <span className="h5 text-primary mb-0">₹{Math.floor(Math.random() * 500) + 100}</span>
                          <small className="text-muted text-decoration-line-through ms-2">₹{Math.floor(Math.random() * 200) + 600}</small>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => openQuickView(product)}
                            title="Quick View"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => toggleWishlist(product)}
                            title="Add to Wishlist"
                          >
                            <i className={`fa fa-heart${wishlist.some(item => item._id === product._id) ? '' : '-o'}`}></i>
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => addToCart(product)}
                            title="Add to Cart"
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick View Modal */}
        {showQuickView && selectedProduct && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Product Details</h5>
                  <button type="button" className="btn-close" onClick={closeQuickView}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      {selectedProduct.image && selectedProduct.image.url ? (
                        <img
                          src={selectedProduct.image.url}
                          alt={selectedProduct.caption}
                          className="img-fluid rounded"
                          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '400px' }}>
                          <i className="fa fa-image fa-3x text-muted"></i>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">{selectedProduct.caption}</h3>
                      <div className="mb-3">
                        <span className="h3 text-primary">₹{Math.floor(Math.random() * 500) + 100}</span>
                        <small className="text-muted text-decoration-line-through ms-2">₹{Math.floor(Math.random() * 200) + 600}</small>
                      </div>
                      <p className="text-muted mb-4">{selectedProduct.caption}</p>
                      <div className="d-flex gap-2 mb-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            addToCart(selectedProduct);
                            closeQuickView();
                          }}
                        >
                          <i className="fa fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => toggleWishlist(selectedProduct)}
                        >
                          <i className={`fa fa-heart${wishlist.some(item => item._id === selectedProduct._id) ? '' : '-o'} me-2`}></i>
                          {wishlist.some(item => item._id === selectedProduct._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                      </div>
                      <div className="border-top pt-4">
                        <h6 className="mb-3">Product Features:</h6>
                        <ul className="list-unstyled">
                          <li className="mb-2"><i className="fa fa-check text-primary me-2"></i>100% Authentic Product</li>
                          <li className="mb-2"><i className="fa fa-check text-primary me-2"></i>Free Shipping Available</li>
                          <li className="mb-2"><i className="fa fa-check text-primary me-2"></i>Easy Returns</li>
                          <li className="mb-2"><i className="fa fa-check text-primary me-2"></i>Secure Payment Options</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Modal */}
        {showWishlist && (
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Wishlist</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowWishlist(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="card-body">
              {wishlist.length === 0 ? (
                <p className="text-center text-muted">Your wishlist is empty</p>
              ) : (
                <div className="row g-3">
                  {wishlist.map((item) => (
                    <div key={item._id} className="col-md-6">
                      <div className="card h-100 border">
                        <div className="row g-0">
                          <div className="col-md-4">
                            {item.image && item.image.url ? (
                              <img
                                src={item.image.url}
                                alt={item.caption}
                                className="img-fluid rounded-start"
                                style={{ height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="d-flex align-items-center justify-content-center bg-light h-100">
                                <i className="fa fa-image fa-2x text-muted"></i>
                              </div>
                            )}
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h6 className="card-title mb-1">{item.caption.slice(0, 50)}...</h6>
                              <p className="card-text mb-2">
                                <small className="text-muted">{item.caption.slice(0, 100)}...</small>
                              </p>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => addToCart(item)}
                                >
                                  <i className="fa fa-shopping-cart"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => toggleWishlist(item)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="row mt-5 pt-5">
          <div className="col-md-3 text-center mb-4">
            <div className="feature-box">
              <i className="fa fa-shipping-fast fa-3x text-primary mb-3"></i>
              <h5>Free Shipping</h5>
              <p className="text-muted">On orders over ₹500</p>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-box">
              <i className="fa fa-shield-alt fa-3x text-primary mb-3"></i>
              <h5>Quality Guarantee</h5>
              <p className="text-muted">100% authentic products</p>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-box">
              <i className="fa fa-headset fa-3x text-primary mb-3"></i>
              <h5>24/7 Support</h5>
              <p className="text-muted">Customer service available</p>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-box">
              <i className="fa fa-undo fa-3x text-primary mb-3"></i>
              <h5>Easy Returns</h5>
              <p className="text-muted">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .feature-box {
          padding: 2rem 1rem;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .feature-box:hover {
          background-color: #f8f9fa;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};

export default Product;
