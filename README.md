<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Integration - React CRUD</title>
    
    <style>
        /* ============================================================
           ALL STYLES
           ============================================================ */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background: #f0f2f5;
            color: #1a1a2e;
            padding: 16px;
            line-height: 1.6;
            min-height: 100vh;
        }

        .app-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* ===== HEADER ===== */
        .app-header {
            text-align: center;
            padding: 30px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            color: white;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .app-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
        }

        .app-header p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 12px;
        }

        /* Badges */
        .badge-group {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .badge {
            padding: 6px 18px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s;
        }

        .badge.get { background: #2196F3; border-color: #2196F3; }
        .badge.post { background: #4CAF50; border-color: #4CAF50; }
        .badge.put { background: #FF9800; border-color: #FF9800; }
        .badge.delete { background: #f44336; border-color: #f44336; }

        /* ===== DASHBOARD ===== */
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 24px;
        }

        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
        }

        /* ===== CARDS ===== */
        .card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            transition: box-shadow 0.3s;
        }

        .card:hover {
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #f0f2f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .card-title .icon {
            margin-right: 8px;
        }

        .card-title .count {
            font-size: 0.85rem;
            font-weight: 400;
            color: #999;
        }

        /* ===== FORM ===== */
        .product-form .form-group {
            margin-bottom: 16px;
        }

        .product-form label {
            display: block;
            font-weight: 600;
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 4px;
        }

        .product-form input,
        .product-form textarea {
            width: 100%;
            padding: 10px 14px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s;
            font-family: inherit;
            background: #fafafa;
        }

        .product-form input:focus,
        .product-form textarea:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .product-form textarea {
            min-height: 80px;
            resize: vertical;
        }

        .product-form input:disabled,
        .product-form textarea:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .form-actions {
            display: flex;
            gap: 12px;
            margin-top: 8px;
            flex-wrap: wrap;
        }

        /* ===== BUTTONS ===== */
        .btn {
            padding: 10px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            touch-action: manipulation;
            user-select: none;
        }

        .btn:active {
            transform: scale(0.95);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        .btn-success {
            background: #4CAF50;
            color: white;
        }

        .btn-success:hover:not(:disabled) {
            background: #43a047;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }

        .btn-warning {
            background: #FF9800;
            color: white;
        }

        .btn-warning:hover:not(:disabled) {
            background: #f57c00;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        .btn-danger {
            background: #f44336;
            color: white;
        }

        .btn-danger:hover:not(:disabled) {
            background: #d32f2f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover:not(:disabled) {
            background: #5a6fd6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid #e0e0e0;
            color: #555;
        }

        .btn-outline:hover:not(:disabled) {
            background: #f5f5f5;
            border-color: #bbb;
        }

        /* ===== PRODUCT LIST ===== */
        .product-list-scroll {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 4px;
        }

        .product-list-scroll::-webkit-scrollbar {
            width: 6px;
        }

        .product-list-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        .product-list-scroll::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
        }

        .product-list-scroll::-webkit-scrollbar-thumb:hover {
            background: #aaa;
        }

        .product-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .product-item {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
            border: 2px solid transparent;
            gap: 12px;
        }

        .product-item:hover {
            border-color: #667eea;
            background: #f0f2ff;
        }

        .product-item.editing {
            border-color: #4CAF50;
            background: #f0f8f0;
        }

        .product-info {
            flex: 1;
            min-width: 0;
        }

        .product-info h3 {
            font-size: 1.05rem;
            font-weight: 600;
            margin-bottom: 2px;
            color: #1a1a2e;
        }

        .product-info .body-text {
            color: #666;
            font-size: 0.9rem;
            word-break: break-word;
        }

        .product-info .meta {
            color: #999;
            font-size: 0.75rem;
            margin-top: 4px;
        }

        .product-actions {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            flex-shrink: 0;
        }

        .product-actions .btn {
            padding: 6px 14px;
            font-size: 0.8rem;
            border-radius: 6px;
        }

        /* ===== EDIT INLINE ===== */
        .edit-inline input {
            width: 100%;
            padding: 8px 12px;
            border: 2px solid #4CAF50;
            border-radius: 6px;
            margin-bottom: 6px;
            font-size: 0.9rem;
            font-family: inherit;
            background: white;
        }

        .edit-inline input:last-child {
            margin-bottom: 0;
        }

        .edit-inline input:focus {
            outline: none;
            border-color: #2196F3;
            box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
        }

        /* ===== LOADING ===== */
        .loading-spinner {
            text-align: center;
            padding: 40px 0;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 12px;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #999;
        }

        .empty-state .big-icon {
            font-size: 3rem;
            margin-bottom: 8px;
        }

        /* ===== MESSAGES ===== */
        .error-box {
            background: #ffebee;
            color: #c62828;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            border-left: 4px solid #f44336;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .success-toast {
            background: #e8f5e9;
            color: #2e7d32;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            border-left: 4px solid #4CAF50;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        /* ===== FOOTER ===== */
        .app-footer {
            text-align: center;
            padding: 24px 0;
            margin-top: 30px;
            color: #999;
            border-top: 1px solid #e0e0e0;
            font-size: 0.9rem;
        }

        .app-footer .emoji {
            margin: 0 4px;
        }

        /* ===== API INFO ===== */
        .api-info {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid #f0f2f5;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 0.8rem;
            color: #999;
        }

        .api-info span {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
            body {
                padding: 8px;
            }

            .app-header h1 {
                font-size: 1.8rem;
            }

            .app-header p {
                font-size: 0.95rem;
            }

            .card {
                padding: 16px;
            }

            .product-item {
                flex-direction: column;
                align-items: stretch;
            }

            .product-actions {
                justify-content: flex-end;
            }

            .form-actions {
                flex-direction: column;
            }

            .form-actions .btn {
                width: 100%;
                justify-content: center;
            }

            .badge {
                font-size: 0.7rem;
                padding: 4px 12px;
            }

            .btn {
                padding: 8px 16px;
                font-size: 0.85rem;
            }
        }

        /* ===== RESPONSIVE TABLET ===== */
        @media (min-width: 769px) and (max-width: 1024px) {
            .dashboard {
                grid-template-columns: 1fr 1.5fr;
            }
        }
    </style>
</head>
<body>

    <div id="root"></div>

    <!-- ============================================================
    REACT & BABEL FROM CDN
    ============================================================ -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js">
    </script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js">
    </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js">
    </script>

    <!-- ============================================================
    REACT APP - All in One
    ============================================================ -->
    <script type="text/babel">
        // =============================================================
        //  IMPORTS (using const instead of import)
        // =============================================================
        const { useState, useEffect } = React;

        // =============================================================
        //  API CONFIGURATION
        // =============================================================
        const API_BASE = 'https://jsonplaceholder.typicode.com/posts';

        // =============================================================
        //  API FUNCTIONS
        // =============================================================
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_BASE);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                return data.slice(0, 10);
            } catch (error) {
                console.error('GET error:', error);
                throw error;
            }
        };

        const createProduct = async (productData) => {
            try {
                const response = await fetch(API_BASE, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: 1, ...productData }),
                });
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                return await response.json();
            } catch (error) {
                console.error('POST error:', error);
                throw error;
            }
        };

        const updateProduct = async (id, updatedData) => {
            try {
                const response = await fetch(`${API_BASE}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: 1, id, ...updatedData }),
                });
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                return await response.json();
            } catch (error) {
                console.error('PUT error:', error);
                throw error;
            }
        };

        const deleteProduct = async (id) => {
            try {
                const response = await fetch(`${API_BASE}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                return true;
            } catch (error) {
                console.error('DELETE error:', error);
                throw error;
            }
        };

        let localIdCounter = 1000;
        const generateTempId = () => Date.now() + localIdCounter++;

        // =============================================================
        //  COMPONENT: ProductItem
        // =============================================================
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

            return ( <
                div className = { `product-item ${isEditing ? 'editing' : ''}` } >
                <
                div className = "product-info" > {
                    isEditing ? ( <
                        div className = "edit-inline" >
                        <
                        input type = "text"
                        value = { editTitle }
                        onChange = { (e) => setEditTitle(e.target.value) }
                        placeholder = "Product title..." /
                        >
                        <
                        input type = "text"
                        value = { editBody }
                        onChange = { (e) => setEditBody(e.target.value) }
                        placeholder = "Product description..." /
                        >
                        <
                        /div>
                    ) : ( <
                        >
                        <
                        h3 > { product.title } < /h3> <
                        div className = "body-text" > { product.body } < /div> <
                        div className = "meta" > ID: { product.id } < /div> <
                        />
                    )
                } <
                /div>

                <
                div className = "product-actions" > {
                    isEditing ? ( <
                        >
                        <
                        button className = "btn btn-success"
                        onClick = { handleSave } >
                        💾 Save <
                        /button> <
                        button className = "btn btn-outline"
                        onClick = { handleCancel } >
                        ✖ Cancel <
                        /button> <
                        />
                    ) : ( <
                        >
                        <
                        button className = "btn btn-warning"
                        onClick = {
                            () => setIsEditing(true) } >
                        ✏️ Edit <
                        /button> <
                        button className = "btn btn-danger"
                        onClick = {
                            () => {
                                if (window.confirm(`Delete "${product.title}"?`)) {
                                    onDelete(product.id);
                                }
                            }
                        } >
                        🗑️ Delete <
                        /button> <
                        />
                    )
                } <
                /div> <
                /div>
            );
        }

        // =============================================================
        //  COMPONENT: ProductList
        // =============================================================
        function ProductList({ products, onUpdate, onDelete, loading, error }) {
            if (loading) {
                return ( <
                    div className = "loading-spinner" >
                    <
                    div className = "spinner" > < /div> <
                    p > Loading products... < /p> <
                    /div>
                );
            }

            if (error) {
                return <div className = "error-box" > ⚠️ { error } < /div>;
            }

            if (products.length === 0) {
                return ( <
                    div className = "empty-state" >
                    <
                    div className = "big-icon" > 📭 < /div> <
                    p > No products found.Add one above! < /p> <
                    /div>
                );
            }

            return ( <
                div className = "product-list-scroll" >
                <
                div className = "product-list" > {
                    products.map((product) => ( <
                        ProductItem key = { product.id }
                        product = { product }
                        onUpdate = { onUpdate }
                        onDelete = { onDelete }
                        />
                    ))
                } <
                /div> <
                /div>
            );
        }

        // =============================================================
        //  COMPONENT: ProductForm
        // =============================================================
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

            return ( <
                form className = "product-form"
                onSubmit = { handleSubmit } >
                <
                div className = "form-group" >
                <
                label htmlFor = "title" > 📌 Title < /label> <
                input id = "title"
                type = "text"
                placeholder = "Enter product name..."
                value = { title }
                onChange = { (e) => setTitle(e.target.value) }
                disabled = { loading }
                /> <
                /div>

                <
                div className = "form-group" >
                <
                label htmlFor = "body" > 📝 Description < /label> <
                textarea id = "body"
                placeholder = "Enter product description..."
                value = { body }
                onChange = { (e) => setBody(e.target.value) }
                disabled = { loading }
                /> <
                /div>

                <
                div className = "form-actions" >
                <
                button type = "submit"
                className = "btn btn-success"
                disabled = { loading } >
                ➕ Add Product <
                /button> <
                button type = "button"
                className = "btn btn-outline"
                onClick = {
                    () => { setTitle('');
                        setBody(''); } }
                disabled = { loading } >
                ✖ Clear <
                /button> <
                /div> <
                /form>
            );
        }

        // =============================================================
        //  MAIN APP COMPONENT
        // =============================================================
        function App() {
            const [products, setProducts] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
            const [successMessage, setSuccessMessage] = useState('');

            // Load products on mount
            useEffect(() => {
                const loadProducts = async () => {
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
                setSuccessMessage('✅ Product added successfully!');

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
                setSuccessMessage('✅ Product updated successfully!');

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

            return ( <
                div className = "app-container" >

                { /* ===== HEADER ===== */ } <
                header className = "app-header" >
                <
                h1 > ⚡ API Integration < /h1> <
                p > React + Fetch·Full CRUD with JSONPlaceholder < /p> <
                div className = "badge-group" >
                <
                span className = "badge get" > GET < /span> <
                span className = "badge post" > POST < /span> <
                span className = "badge put" > PUT < /span> <
                span className = "badge delete" > DELETE < /span> <
                /div> <
                /header>

                { /* ===== DASHBOARD ===== */ } <
                div className = "dashboard" >

                { /* ---- LEFT: FORM ---- */ } <
                section className = "card" >
                <
                div className = "card-title" >
                <
                span className = "icon" > 📦 < /span> Add Product <
                /div>

                { successMessage && < div className = "success-toast" > { successMessage } < /div>} {
                    error && < div className = "error-box" > ⚠️ { error } < /div>}

                    <
                    ProductForm onCreate = { handleCreate }
                    loading = { loading }
                    />

                    <
                    div className = "api-info" >
                    <
                    span > 🔹 POST / posts < /span> <
                    span > 📦 Creates new product < /span> <
                    /div> <
                    /section>

                    { /* ---- RIGHT: PRODUCT LIST ---- */ } <
                    section className = "card" >
                    <
                    div className = "card-title" >
                    <
                    span className = "icon" > 📋 < /span> Products <
                    span className = "count" > { products.length }
                    items < /span> <
                    /div>

                    <
                    ProductList products = { products }
                    onUpdate = { handleUpdate }
                    onDelete = { handleDelete }
                    loading = { loading }
                    error = { error }
                    />

                    <
                    div className = "api-info" >
                    <
                    span > 🔹 GET / posts < /span> <
                    span > 🔹 PUT / posts /: id < /span> <
                    span > 🔹 DELETE / posts /: id < /span> <
                    /div> <
                    /section> <
                    /div>

                    { /* ===== FOOTER ===== */ } <
                    footer className = "app-footer" >
                    Built with < span className = "emoji" > ❤️ < /span> React·Fetch API·JSONPlaceholder <
                    br / >
                    <
                    span style = { { fontSize: '0.75rem', opacity: 0.7 } } >
                    Request→Response Cycle·useEffect·useState·JSON <
                    /span> <
                    /footer> <
                    /div>
                );
            }

            // =============================================================
            //  RENDER APP
            // =============================================================
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render( < App / > );
    </script>
</body>
</html>
