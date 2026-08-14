const API_BASE = 'https://jsonplaceholder.typicode.com/posts';

// GET - Fetch all products
export const fetchProducts = async () => {
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

// POST - Create new product
export const createProduct = async (productData) => {
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

// PUT - Update product
export const updateProduct = async (id, updatedData) => {
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

// DELETE - Remove product
export const deleteProduct = async (id) => {
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

// Generate temporary ID
let localIdCounter = 1000;
export const generateTempId = () => Date.now() + localIdCounter++;