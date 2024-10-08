const BASE_URL = 'http://localhost:3001/api';

export const registerSupplier = async (nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado) => {
    const response = await fetch(`${BASE_URL}/supplier/registerSupplier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado }),
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

export const updateSupplier = async (fornecedorID, nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado) => {
    const body = {
        fornecedorID, nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado
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

export const delSupplier = async (fornecedorIDParaExcluir, emailLogado, fornecedorNome) => {
    const response = await fetch(`${BASE_URL}/supplier/deleteSupplier/${fornecedorIDParaExcluir}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailLogado, fornecedorNome })
    });
    return response.json();
};