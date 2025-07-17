import React, { useState, useEffect } from "react";
import axios from "axios";
import { dotWave } from "ldrs";

dotWave.register();

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Products", icon: "fa-th" },
    { id: "spices", name: "Spices & Masalas", icon: "fa-pepper-hot" },
    { id: "oils", name: "Oils & Ghee", icon: "fa-tint" },
    { id: "grains", name: "Grains & Cereals", icon: "fa-seedling" },
    { id: "handicrafts", name: "Handicrafts", icon: "fa-palette" },
    { id: "kitchenware", name: "Kitchenware", icon: "fa-utensils" },
    { id: "snacks", name: "Snacks & Sweets", icon: "fa-cookie-bite" }
  ];

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
    loadWishlistFromStorage();
  }, []);

  useEffect(() => {
    saveCartToStorage();
  }, [cart]);

  useEffect(() => {
    saveWishlistToStorage();
  }, [wishlist]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Sample products with actual images and descriptions
      const sampleProducts = [
        {
          _id: "1",
          caption: "Premium KODO MILLETS ",
          description: "Simple clean packaging; fiber-rich, organic, supporting healthy digestion & weight management.",
          image: { url: "/img/image1.jpeg" },
          price: 299,
          originalPrice: 399,
          category: "KODO MILLETS",
          rating: 4.5,
          reviews: 127,
          inStock: true,
          discount: 25
        },
        {
          _id: "2",
          caption: "MAKEIT KODO MILLET",
          description: "Gluten‑free, weight‑friendly, aids digestion, supports heart and nervous system health.",
          image: { url: "/img/image2.jpeg" },
          price: 450,
          originalPrice: 550,
          category: "MILLETS",
          rating: 4.7,
          reviews: 89,
          inStock: true,
          discount: 18
        },
        {
          _id: "3",
          caption: "MAKEIT MILLET",
          description: "Entire grain retained—leaving bran and germ intact—for maximum fiber, micronutrients, and antioxidants.",
          image: { url: "/img/image3.jpeg" },
          price: 899,
          originalPrice: 1199,
          category: "handicrafts",
          rating: 4.3,
          reviews: 56,
          inStock: true,
          discount: 25
        }
      ];

      // Only show the 3 sample products, do not add API products
      setProducts(sampleProducts);
    } catch (error) {
      console.error("Error setting up products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToStorage = () => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  };

  const loadWishlistFromStorage = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  };

  const saveWishlistToStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      updateQuantity(product._id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
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

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item._id === product._id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.caption.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.caption.localeCompare(b.caption));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setShowQuickView(false);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts().slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts().length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="shopping-page">
      {/* Hero Section */}
      <div className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Premium Indian Products</h1>
              <p className="lead mb-4">Here’s a curated look at Kodo Millet products</p>
              <div className="d-flex gap-3">
                <span className="badge bg-light text-dark px-3 py-2">
                  <i className="fa fa-shipping-fast me-2"></i>Free Shipping
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  <i className="fa fa-shield-alt me-2"></i>Quality Assured
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  <i className="fa fa-undo me-2"></i>Easy Returns
                </span>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="hero-stats">
                <div className="stat-item mb-3">
                  <h3 className="fw-bold">{products.length}+</h3>
                  <p className="mb-0">Products</p>
                </div>
                <div className="stat-item mb-3">
                  <h3 className="fw-bold">1000+</h3>
                  <p className="mb-0">Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h3 className="fw-bold">4.8★</h3>
                  <p className="mb-0">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar Filters */}
          <div className={`col-lg-3${showFilters ? ' mobile-filters-open' : ''} d-none d-lg-block d-lg-block-mobile`}> 
            <div className="filters-sidebar bg-light p-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Filters</h5>
                <button 
                  className="btn btn-sm btn-outline-secondary d-lg-none"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close Filters"
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>

              {/* Price Range */}
              <div className="filter-section mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <div className="price-range">
                  <input
                    type="range"
                    className="form-range mb-2"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                  <div className="d-flex justify-content-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="filter-section">
                <h6 className="fw-bold mb-3">Quick Actions</h6>
                <button 
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 1000]);
                    setSearchTerm("");
                  }}
                >
                  <i className="fa fa-refresh me-2"></i>Clear Filters
                </button>
                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={() => setShowCart(true)}
                >
                  <i className="fa fa-heart me-2"></i>View Wishlist ({wishlist.length})
                </button>
              </div>
            </div>
            {showFilters && (
              <div className="mobile-filters-overlay" onClick={() => setShowFilters(false)}></div>
            )}
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Top Bar */}
            <div className="top-bar bg-white p-3 rounded shadow-sm mb-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="search-box">
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
                </div>
                <div className="col-md-8">
                  <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap mobile-topbar-actions">
                    <div className="d-flex gap-2 align-items-center mobile-actions-group">
                      <button
                        className="btn btn-outline-secondary d-lg-none"
                        onClick={() => setShowFilters(true)}
                      >
                        <i className="fa fa-filter"></i> Filters
                      </button>
                      <button
                        className="btn btn-primary d-lg-none position-relative"
                        onClick={() => setShowCart(true)}
                      >
                        <i className="fa fa-shopping-cart"></i>
                        {getTotalItems() > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {getTotalItems()}
                          </span>
                        )}
                      </button>
                      <div className="btn-group d-lg-none w-100 mobile-grid-toggle">
                        <button
                          className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewMode('grid')}
                        >
                          <i className="fa fa-th"></i>
                        </button>
                        <button
                          className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewMode('list')}
                        >
                          <i className="fa fa-list"></i>
                        </button>
                      </div>
                      <select
                        className="form-select d-none d-lg-block"
                        style={{width: 'auto'}}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name A-Z</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                    <div className="d-none d-lg-flex gap-2">
                      <div className="btn-group">
                        <button
                          className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewMode('grid')}
                        >
                          <i className="fa fa-th"></i>
                        </button>
                        <button
                          className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewMode('list')}
                        >
                          <i className="fa fa-list"></i>
                        </button>
                      </div>
                      <button
                        className="btn btn-primary position-relative"
                        onClick={() => setShowCart(true)}
                      >
                        <i className="fa fa-shopping-cart"></i>
                        {getTotalItems() > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {getTotalItems()}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="results-info mb-3">
              <p className="text-muted mb-0">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts().length)} of {filteredProducts().length} products
              </p>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div className="text-center py-5">
                <l-dot-wave size="47" speed="1" color="#0d6efd"></l-dot-wave>
                <p className="mt-3 text-muted">Loading products...</p>
              </div>
            ) : (
              <>
                {currentProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fa fa-search fa-3x text-muted mb-3"></i>
                    <h5>No products found</h5>
                    <p className="text-muted">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'row g-4' : 'list-view'}>
                    {currentProducts.map((product) => (
                      viewMode === 'grid' ? (
                        <div key={product._id} className="col-lg-4 col-md-6">
                          <ProductCard 
                            product={product}
                            onAddToCart={addToCart}
                            onToggleWishlist={toggleWishlist}
                            onQuickView={openQuickView}
                            isInWishlist={wishlist.some(item => item._id === product._id)}
                            isInCart={cart.some(item => item._id === product._id)}
                          />
                        </div>
                      ) : (
                        <ProductListItem 
                          key={product._id}
                          product={product}
                          onAddToCart={addToCart}
                          onToggleWishlist={toggleWishlist}
                          onQuickView={openQuickView}
                          isInWishlist={wishlist.some(item => item._id === product._id)}
                          isInCart={cart.some(item => item._id === product._id)}
                        />
                      )
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCartModal 
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
        />
      )}

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          onClose={closeQuickView}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isInWishlist={wishlist.some(item => item._id === selectedProduct._id)}
        />
      )}

      <style jsx>{`
        .shopping-page {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hero-section .d-flex.gap-3 {
          flex-wrap: wrap;
        }
        .hero-section .badge {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 767.98px) {
          .hero-section .d-flex.gap-3 {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .hero-section .badge {
            width: 100%;
            text-align: left;
          }
          .hero-section .row.align-items-center > div[class^='col-lg-'] {
            width: 100%;
            max-width: 100%;
          }
          .hero-section .display-4 {
            font-size: 2rem;
          }
          .hero-section .lead {
            font-size: 1rem;
          }
        }
        .filters-sidebar {
          position: sticky;
          top: 20px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }
        @media (max-width: 991.98px) {
          .col-lg-3 {
            display: none !important;
          }
          .col-lg-3.mobile-filters-open {
            display: block !important;
            position: fixed;
            top: 0;
            left: 0;
            width: 80vw;
            max-width: 320px;
            height: 100vh;
            z-index: 1060;
            background: none;
            padding: 0;
            margin: 0;
          }
          .filters-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 80vw;
            max-width: 320px;
            height: 100vh;
            z-index: 1070;
            background: #fff;
            box-shadow: 2px 0 16px rgba(0,0,0,0.15);
            border-radius: 0;
            padding: 2rem 1rem 1rem 1rem;
            overflow-y: auto;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          }
          .col-lg-3.mobile-filters-open .filters-sidebar {
            transform: translateX(0);
          }
          .mobile-filters-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.3);
            z-index: 1050;
          }
          body.mobile-filters-open {
            overflow: hidden;
          }
          .mobile-topbar-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }
          .mobile-actions-group {
            flex-direction: row;
            gap: 0.5rem;
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .mobile-actions-group .btn,
          .mobile-actions-group .btn-group,
          .mobile-actions-group .form-select {
            flex: 1 1 0;
            min-width: 0;
          }
          .mobile-grid-toggle .btn,
          .mobile-actions-group .btn.btn-primary.d-lg-none.position-relative {
            width: 40px;
            min-width: 40px;
            max-width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 !important;
            font-size: 1.1rem;
          }
          .mobile-actions-group .btn,
          .mobile-actions-group .btn-group {
            min-width: 0;
            font-size: 1.1rem;
            padding: 0.7rem 0.5rem;
          }
          .mobile-actions-group .btn-group {
            display: flex;
          }
        }
        .product-card {
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .list-view .product-item {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }
        .list-view .product-item:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .badge-discount {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #dc3545;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .rating-stars {
          color: #ffc107;
        }
      `}</style>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onToggleWishlist, onQuickView, isInWishlist, isInCart }) => {
  return (
    <div className="card product-card h-100">
      <div className="position-relative">
        {product.image && product.image.url ? (
          <img
            className="card-img-top"
            src={product.image.url}
            alt={product.caption}
            style={{ height: "250px", objectFit: "contain", width: "100%", background: "#fff" }}
          />
        ) : (
          <div
            className="card-img-top d-flex align-items-center justify-content-center bg-light"
            style={{ height: "250px" }}
          >
            <i className="fa fa-image fa-3x text-muted"></i>
          </div>
        )}
        <div className="badge-discount">
          {product.discount}% OFF
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <button
            className={`btn btn-sm ${isInWishlist ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={() => onToggleWishlist(product)}
          >
            <i className="fa fa-heart"></i>
          </button>
        </div>
        {!product.inStock && (
          <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white text-center py-2">
            Out of Stock
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.caption.slice(0, 50)}...</h6>
        <div className="rating-stars mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa fa-star${i < Math.floor(product.rating) ? '' : '-o'}`}></i>
          ))}
          <span className="ms-2 text-muted">({product.reviews})</span>
        </div>
        <p className="card-text text-muted small flex-grow-1">
          {product.description ? product.description.slice(0, 80) + '...' : product.caption.slice(0, 80) + '...'}
        </p>
        <div className="price-section mb-3">
          <span className="h5 text-primary mb-0">₹{product.price}</span>
          <small className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice}</small>
        </div>
        <div className="mt-auto">
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={() => onQuickView(product)}
            >
              <i className="fa fa-eye"></i> View
            </button>
            <button
              className={`btn btn-sm flex-fill ${isInCart ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              <i className="fa fa-shopping-cart"></i> {isInCart ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product List Item Component
const ProductListItem = ({ product, onAddToCart, onToggleWishlist, onQuickView, isInWishlist, isInCart }) => {
  return (
    <div className="product-item p-3">
      <div className="row align-items-center">
        <div className="col-md-3">
          <div className="position-relative">
            {product.image && product.image.url ? (
              <img
                src={product.image.url}
                alt={product.caption}
                className="img-fluid rounded"
                style={{ height: "150px", width: "100%", objectFit: "contain", background: "#fff" }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: "150px" }}>
                <i className="fa fa-image fa-2x text-muted"></i>
              </div>
            )}
            <div className="badge-discount">
              {product.discount}% OFF
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="mb-2">{product.caption}</h5>
          <div className="rating-stars mb-2">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa fa-star${i < Math.floor(product.rating) ? '' : '-o'}`}></i>
            ))}
            <span className="ms-2 text-muted">({product.reviews} reviews)</span>
          </div>
          <p className="text-muted mb-2">{product.description ? product.description.slice(0, 100) + '...' : product.caption.slice(0, 100) + '...'}</p>
          <div className="d-flex align-items-center gap-3">
            <span className="h5 text-primary mb-0">₹{product.price}</span>
            <small className="text-muted text-decoration-line-through">₹{product.originalPrice}</small>
            {product.inStock ? (
              <span className="badge bg-success">In Stock</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => onQuickView(product)}
            >
              <i className="fa fa-eye me-2"></i>Quick View
            </button>
            <button
              className={`btn ${isInCart ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              <i className="fa fa-shopping-cart me-2"></i>
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => onToggleWishlist(product)}
            >
              <i className="fa fa-heart me-2"></i>
              {isInWishlist ? 'Remove' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shopping Cart Modal Component
const ShoppingCartModal = ({ cart, onClose, onUpdateQuantity, onRemoveItem, totalPrice }) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-shopping-cart me-2"></i>
              Shopping Cart ({cart.length} items)
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {cart.length === 0 ? (
              <div className="text-center py-4">
                <i className="fa fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5>Your cart is empty</h5>
                <p className="text-muted">Add some products to get started!</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} className="cart-item border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        {item.image && item.image.url ? (
                          <img
                            src={item.image.url}
                            alt={item.caption}
                            className="img-fluid rounded"
                            style={{ height: "60px", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
                            <i className="fa fa-image text-muted"></i>
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <h6 className="mb-1">{item.caption.slice(0, 40)}...</h6>
                        <small className="text-muted">₹{item.price} each</small>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="text-end">
                          <div className="fw-bold">₹{item.price * item.quantity}</div>
                        </div>
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onRemoveItem(item._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {cart.length > 0 && (
            <div className="modal-footer">
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Total: ₹{totalPrice}</h5>
                  <div>
                    <button className="btn btn-outline-secondary me-2" onClick={onClose}>
                      Continue Shopping
                    </button>
                    <button className="btn btn-success">
                      <i className="fa fa-credit-card me-2"></i>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick View Modal Component
const QuickViewModal = ({ product, onClose, onAddToCart, onToggleWishlist, isInWishlist }) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                {product.image && product.image.url ? (
                  <img
                    src={product.image.url}
                    alt={product.caption}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '400px', objectFit: 'contain', background: '#fff' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '400px' }}>
                    <i className="fa fa-image fa-3x text-muted"></i>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h3 className="mb-3">{product.caption}</h3>
                <div className="rating-stars mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa fa-star${i < Math.floor(product.rating) ? '' : '-o'}`}></i>
                  ))}
                  <span className="ms-2 text-muted">({product.reviews} reviews)</span>
                </div>
                <div className="price-section mb-4">
                  <span className="h3 text-primary">₹{product.price}</span>
                  <small className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice}</small>
                  <span className="badge bg-success ms-2">{product.discount}% OFF</span>
                </div>
                <p className="text-muted mb-4">{product.description || product.caption}</p>
                <div className="d-flex gap-3 mb-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    disabled={!product.inStock}
                  >
                    <i className="fa fa-shopping-cart me-2"></i>
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    className={`btn btn-lg ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => onToggleWishlist(product)}
                  >
                    <i className="fa fa-heart me-2"></i>
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
                <div className="features-list">
                  <h6 className="mb-3">Product Features:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-check text-success me-2"></i>100% Authentic Product</li>
                    <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Free Shipping on orders over ₹500</li>
                    <li className="mb-2"><i className="fa fa-check text-success me-2"></i>30-day return policy</li>
                    <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Secure payment options</li>
                    <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Quality guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;