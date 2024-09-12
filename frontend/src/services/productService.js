const BASE_URL = 'http://localhost:3001/api';

export const registerProduct = async (formData) => {
    const response = await fetch(`${BASE_URL}/product/registerProduct`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/product/products`);
    return response.json();
};

export const updateProduct = async (formData) => {
    const response = await fetch(`${BASE_URL}/product/updateProduct`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const delProduct = async (produtoID, emailLogado, produtoNome) => {
    const response = await fetch(`${BASE_URL}/product/deleteProduct/${produtoID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailLogado, produtoNome })
    });
    return response.json();
};

export const getLogs = async () => {
    const response = await fetch(`${BASE_URL}/product/logs`);
    return response.json();
};