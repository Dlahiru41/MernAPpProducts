import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/products/search?name=${searchTerm}`);
            setSearchResults(response.data);
        } catch (err) {
            setError('An error occurred while searching for products. Please try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-search">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a product..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {searchResults.length > 0 ? (
                <ul className="search-results">
                    {searchResults.map((product) => (
                        <li key={product._id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Distribution Location: {product.distributionLocation}</p>
                            <p>Supply Material Cost: ${product.supplyMaterialCost}</p>
                            <p>Production Cost: ${product.productionCost}</p>
                            <p>Total Product Count: {product.totalProductCount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductSearch;