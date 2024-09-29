import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        distributionLocation: '',
        supplyMaterialCost: '',
        productionCost: '',
        totalProductCount: '',
    });
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
    };

    const handleEditClick = (product) => {
        setEditingProduct(product._id);
        setFormData({
            name: product.name,
            category: product.category,
            distributionLocation: product.distributionLocation,
            supplyMaterialCost: product.supplyMaterialCost,
            productionCost: product.productionCost,
            totalProductCount: product.totalProductCount,
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/products/${editingProduct}`, formData);
        const updatedProducts = products.map((product) =>
            product._id === editingProduct ? { ...product, ...formData } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    // Function to filter products based on the search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Products</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul>
                {filteredProducts.map(product => (
                    <li key={product._id}>
                        <p>
                            <strong>{product.name}</strong> - {product.category} - $
                            {product.supplyMaterialCost + product.productionCost}
                        </p>

                        {editingProduct === product._id ? (
                            <form onSubmit={handleUpdateSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    required
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Category"
                                    required
                                />
                                <input
                                    type="text"
                                    name="distributionLocation"
                                    value={formData.distributionLocation}
                                    onChange={handleChange}
                                    placeholder="Distribution Location"
                                    required
                                />
                                <input
                                    type="number"
                                    name="supplyMaterialCost"
                                    value={formData.supplyMaterialCost}
                                    onChange={handleChange}
                                    placeholder="Supply Material Cost"
                                    required
                                />
                                <input
                                    type="number"
                                    name="productionCost"
                                    value={formData.productionCost}
                                    onChange={handleChange}
                                    placeholder="Production Cost"
                                    required
                                />
                                <input
                                    type="number"
                                    name="totalProductCount"
                                    value={formData.totalProductCount}
                                    onChange={handleChange}
                                    placeholder="Total Product Count"
                                    required
                                />
                                <button type="submit">Update Product</button>
                                <button type="button" onClick={handleCancelEdit}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <button onClick={() => handleEditClick(product)}>Edit</button>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
