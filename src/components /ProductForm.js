import React, { useState } from 'react';

function ProductForm({ onCreate, loading }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            alert('⚠️ Please fill in both fields.');
            return;
        }
        onCreate({ title: title.trim(), body: body.trim() });
        setTitle('');
        setBody('');
    };
    
    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">📌 Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter product name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="body">📝 Description</label>
                <textarea
                    id="body"
                    placeholder="Enter product description..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-success" disabled={loading}>
                    ➕ Add Product
                </button>
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => { setTitle('');
                    setBody(''); }}
                    disabled={loading}
                >
                    ✖ Clear
                </button>
            </div>
        </form>
    );
}

export default ProductForm;