const BASE_URL = 'http://localhost:3001/api';

export const registerUser = async (nome, email, senha) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
    });
    return response.json();
};

export const registerSupplier = async (nome, estado, telefone, email, categoriaSelecionada) => {
    const response = await fetch(`${BASE_URL}/auth/registerSupplier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, estado, telefone, email, categoriaSelecionada }),
    });
    return response.json();
};

export const registerProduct = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/registerProduct`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const loginUser = async (email, senha) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });
   return response.json()
};

export const fetchUserName = async (email) => {
    const response = await fetch(`${BASE_URL}/get/nome?email=${email}`);
    if (response.ok) {
        return response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Erro ao buscar o nome do usuário');
    }
};

export const getCategorias = async () => {
    const response = await fetch(`${BASE_URL}/categorias`);
    return response.json();
};

export const getFornecedores = async () => {
    const response = await fetch(`${BASE_URL}/fornecedores`);
    return response.json()
};

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/get/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const getAllSuppliers = async () => {
    const response = await fetch(`${BASE_URL}/get/suppliers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/get/products`);
    return response.json();
};
