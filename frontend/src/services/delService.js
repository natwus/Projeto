const BASE_URL = 'http://localhost:3001/api';

export const delUser = async (userID) => {
    const response = await fetch(`${BASE_URL}/del/deleteUser/${userID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
    }
};

export const delSup = async (fornecedorID) => {
    const response = await fetch(`${BASE_URL}/del/deleteSupplier/${fornecedorID}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Erro ao excluir fornecedor');
    }

    return data;
};

export const delProd = async (produtoID) => {
    const response = await fetch(`${BASE_URL}/del/deleteProduct/${produtoID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
    }
};