import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductList.css'; // Assuming this contains your CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        distributionLocation: '',
        supplyMaterialCost: '',
        productionCost: '',
        totalProductCount: '',
    });

    useEffect(() => {
        // Fetch products on component mount
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
        setEditingProduct(product._id); // Set the current product being edited
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
        setEditingProduct(null); // Exit edit mode
    };

    const handleCancelEdit = () => {
        setEditingProduct(null); // Cancel edit mode
    };

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <p><strong>{product.name}</strong> - {product.category} - ${product.supplyMaterialCost + product.productionCost}</p>

                        {editingProduct === product._id ? (
                            <form className="product-form-inline" onSubmit={handleUpdateSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Product Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="Category"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="distributionLocation">Distribution Location:</label>
                                    <input
                                        type="text"
                                        id="distributionLocation"
                                        name="distributionLocation"
                                        value={formData.distributionLocation}
                                        onChange={handleChange}
                                        placeholder="Distribution Location"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="supplyMaterialCost">Supply Material Cost:</label>
                                    <input
                                        type="number"
                                        id="supplyMaterialCost"
                                        name="supplyMaterialCost"
                                        value={formData.supplyMaterialCost}
                                        onChange={handleChange}
                                        placeholder="Supply Material Cost"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productionCost">Production Cost:</label>
                                    <input
                                        type="number"
                                        id="productionCost"
                                        name="productionCost"
                                        value={formData.productionCost}
                                        onChange={handleChange}
                                        placeholder="Production Cost"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="totalProductCount">Total Product Count:</label>
                                    <input
                                        type="number"
                                        id="totalProductCount"
                                        name="totalProductCount"
                                        value={formData.totalProductCount}
                                        onChange={handleChange}
                                        placeholder="Total Product Count"
                                        required
                                    />
                                </div>

                                <button type="submit" className="submit-btn">Update Product</button>
                                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
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
