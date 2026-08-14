import React, { useState, useEffect } from 'react';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    generateTempId,
} from './api/api.js';
import ProductForm from './components/ProductForm.js';
import ProductList from './components/ProductList.js';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Load products on mount
    useEffect(() => {
        const loadProducts = async  => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Create product
    const handleCreate = async (productData) => {
        const tempId = generateTempId();
        const optimisticProduct = { id: tempId, userId: 1, ...productData };

        setProducts((prev) => [optimisticProduct, ...prev]);
        setSuccessMessage('✅ Product added!');

        try {
            const saved = await createProduct(productData);
            setProducts((prev) =>
                prev.map((p) => (p.id === tempId ? { ...p, id: saved.id } : p))
            );
            setError(null);
        } catch (err) {
            setError(`Failed to add: ${err.message}`);
            setProducts((prev) => prev.filter((p) => p.id !== tempId));
        } finally {
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    // Update product
    const handleUpdate = async (id, updatedData) => {
        const previousProducts = [...products];
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
        );
        setSuccessMessage('✅ Product updated!');

        try {
            await updateProduct(id, updatedData);
            setError(null);
        } catch (err) {
            setError(`Failed to update: ${err.message}`);
            setProducts(previousProducts);
        } finally {
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        const deletedProduct = products.find((p) => p.id === id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setSuccessMessage('🗑️ Product deleted.');

        try {
            await deleteProduct(id);
            setError(null);
        } catch (err) {
            setError(`Failed to delete: ${err.message}`);
            if (deletedProduct) {
                setProducts((prev) => [...prev, deletedProduct]);
            }
        } finally {
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="app-header">
                <h1>⚡ API Integration</h1>
                <p>React + Fetch · Full CRUD</p>
                <div className="badge-group">
                    <span className="badge get">GET</span>
                    <span className="badge post">POST</span>
                    <span className="badge put">PUT</span>
                    <span className="badge delete">DELETE</span>
                </div>
            </header>

            {/* Dashboard */}
            <div className="dashboard">
                {/* Form */}
                <section className="card">
                    <div className="card-title">📦 Add Product</div>
                    {successMessage && <div className="success-toast">{successMessage}</div>}
                    {error && <div className="error-box">⚠️ {error}</div>}
                    <ProductForm onCreate={handleCreate} loading={loading} />
                </section>

                {/* List */}
                <section className="card">
                    <div className="card-title">
                        📋 Products
                        <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#999' }}>
                            {products.length} items
                        </span>
                    </div>
                    <ProductList
                        products={products}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        loading={loading}
                        error={error}
                    />
                </section>
            </div>

            {/* Footer */}
            <footer className="app-footer">
                Built with React · Fetch API · JSONPlaceholder
            </footer>
        </div>
    );
}

export default App;