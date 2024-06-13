import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import Product from "./components/Product";
import { Login } from "./AdminPanel/Login";
import TablePage from "./dashboard/TablePage";
import AddProduct from "./dashboard/AddProduct";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import ProductList from "./dashboard/ProductList";
import { WrongUrl } from "./components/WrongUrl";
import FixedContaint from "./components/FixedContaint";

function App() {
  const { isLoggedIn } = useAuth();
 
  return (
    <div>
      <Navbar />
      <FixedContaint />
      <div>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/segments" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/segments" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product" element={<Product />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/productlist" element={<ProductList />} />
            </>
          )}
          <Route path="*" element={<WrongUrl />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
