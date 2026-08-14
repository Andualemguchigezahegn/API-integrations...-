import React from 'react';
import ProductItem from './ProductItem.js';

function ProductList({ products, onUpdate, onDelete, loading, error }) {
    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-box">⚠️ {error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="big-icon">📭</div>
                <p>No products found. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="product-list-scroll">
            <div className="product-list">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;