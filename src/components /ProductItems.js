import React, { useState } from 'react';

function ProductItem({ product, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(product.title);
    const [editBody, setEditBody] = useState(product.body);
    
    const handleSave = () => {
        if (!editTitle.trim() || !editBody.trim()) {
            alert('⚠️ Please fill in both fields.');
            return;
        }
        onUpdate(product.id, {
            title: editTitle.trim(),
            body: editBody.trim(),
        });
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setEditTitle(product.title);
        setEditBody(product.body);
        setIsEditing(false);
    };
    
    return (
        <div className={`product-item ${isEditing ? 'editing' : ''}`}>
            <div className="product-info">
                {isEditing ? (
                    <div className="edit-inline">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title..."
                        />
                        <input
                            type="text"
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            placeholder="Description..."
                        />
                    </div>
                ) : (
                    <>
                        <h3>{product.title}</h3>
                        <div className="body-text">{product.body}</div>
                        <div className="meta">ID: {product.id}</div>
                    </>
                )}
            </div>

            <div className="product-actions">
                {isEditing ? (
                    <>
                        <button className="btn btn-success" onClick={handleSave}>
                            💾 Save
                        </button>
                        <button className="btn btn-outline" onClick={handleCancel}>
                            ✖ Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                            ✏️ Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => {
                            if (window.confirm(`Delete "${product.title}"?`)) {
                                onDelete(product.id);
                            }
                        }}>
                            🗑️ Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductItem;