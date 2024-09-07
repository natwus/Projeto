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

export const delProduct = async (produtoID) => {
    const response = await fetch(`${BASE_URL}/product/deleteProduct/${produtoID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao excluir produto');
    }
};