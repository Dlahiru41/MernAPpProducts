import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/create-product">Create Product</Link></li>
                        <li><Link to="/view-products">View Products</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/create-product" element={<ProductForm />} />

                    <Route path="/view-products" element={<ProductList />} />

                    <Route path="/" element={<h1>Welcome to Product Management System</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
