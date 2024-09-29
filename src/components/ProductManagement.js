import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManagement = () => {
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleSave = () => {
        setCurrentProduct(null);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
    };

    return (
        <div>
            <ProductForm product={currentProduct} onSave={handleSave} />
            {/*<ProductList onEdit={handleEdit} />*/}
        </div>
    );
};

export default ProductManagement;