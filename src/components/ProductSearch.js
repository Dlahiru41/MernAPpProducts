import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = ({ onResults }) => {
    const [filters, setFilters] = useState({
        category: '',
        distributionLocation: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        const res = await axios.get('http://localhost:5000/api/products', { params: filters });
        onResults(res.data);
    };

    return (
        <div>
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={filters.category}
                onChange={handleChange}
            />
            <input
                type="text"
                name="distributionLocation"
                placeholder="Distribution Location"
                value={filters.distributionLocation}
                onChange={handleChange}
            />
            <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
            />
            <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default ProductSearch;
