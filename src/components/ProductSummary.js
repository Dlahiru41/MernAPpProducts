import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductSummary.css';

const ProductSummary = () => {
    const [products, setProducts] = useState([]);
    const [summary, setSummary] = useState({
        totalSupplyMaterialCost: 0,
        totalProductionCost: 0,
        totalProductCount: 0,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // Calculate the summary whenever products change
        const calculateSummary = () => {
            const totalSupplyMaterialCost = products.reduce(
                (total, product) => total + parseFloat(product.supplyMaterialCost || 0),
                0
            );

            const totalProductionCost = products.reduce(
                (total, product) => total + parseFloat(product.productionCost || 0),
                0
            );

            const totalProductCount = products.reduce(
                (total, product) => total + parseInt(product.totalProductCount || 0, 10),
                0
            );

            setSummary({
                totalSupplyMaterialCost,
                totalProductionCost,
                totalProductCount,
            });
        };

        calculateSummary();
    }, [products]);

    return (
        <div className="product-summary">
            <h2>Product Summary</h2>
            <p>Total Supply Material Cost: ${summary.totalSupplyMaterialCost.toFixed(2)}</p>
            <p>Total Production Cost: ${summary.totalProductionCost.toFixed(2)}</p>
            <p>Total Product Count: {summary.totalProductCount}</p>
        </div>
    );
};

export default ProductSummary;
