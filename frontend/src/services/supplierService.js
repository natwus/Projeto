const BASE_URL = 'http://localhost:3001/api';

export const registerSupplier = async (nome, estadoSelecionado, telefone, email, categoriaSelecionada) => {
    const response = await fetch(`${BASE_URL}/supplier/registerSupplier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, estadoSelecionado, telefone, email, categoriaSelecionada }),
    });
    return response.json();
};

export const getAllSuppliers = async () => {
    const response = await fetch(`${BASE_URL}/supplier/suppliers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const getFornecedores = async () => {
    const response = await fetch(`${BASE_URL}/supplier/fornecedores`);
    return response.json()
};

export const getCategorias = async () => {
    const response = await fetch(`${BASE_URL}/supplier/categorias`);
    return response.json();
};

export const getEstados = async () => {
    const response = await fetch(`${BASE_URL}/supplier/estados`);
    return response.json();
};

export const updateSupplier = async (fornecedorID, nome, estado, telefone, email, categoriaSelecionada) => {
    const body = {
        fornecedorID, nome, estado, telefone, email, categoriaSelecionada
    };

    const response = await fetch(`${BASE_URL}/supplier/updateSupplier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.json();
};

export const delSupplier = async (fornecedorID) => {
    const response = await fetch(`${BASE_URL}/supplier/deleteSupplier/${fornecedorID}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Erro ao excluir fornecedor');
    }

    return data;
};