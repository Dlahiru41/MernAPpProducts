import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductForm.css'; // Importing the CSS file

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        distributionLocation: '',
        supplyMaterialCost: '',
        productionCost: '',
        totalProductCount: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                distributionLocation: product.distributionLocation,
                supplyMaterialCost: product.supplyMaterialCost,
                productionCost: product.productionCost,
                totalProductCount: product.totalProductCount
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product) {
            await axios.put(`http://localhost:5000/api/products/${product._id}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/products', formData);
        }
        onSave();
        setFormData({
            name: '',
            category: '',
            distributionLocation: '',
            supplyMaterialCost: '',
            productionCost: '',
            totalProductCount: ''
        });
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    required
                />
            </div>

            <button type="submit" className="submit-btn">{product ? 'Update' : 'Create'} Product</button>
        </form>
    );
};

export default ProductForm;
