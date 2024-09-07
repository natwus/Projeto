const BASE_URL = 'http://localhost:3001/api';

export const registerUser = async (nome, email, senha) => {
    const response = await fetch(`${BASE_URL}/user/registerUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
    });
    return response.json();
};

export const loginUser = async (email, senha) => {
    const response = await fetch(`${BASE_URL}/user/loginUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });
    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        return data;
    }

};

export const fetchUserName = async (email) => {
    const response = await fetch(`${BASE_URL}/user/nome?email=${email}`);
    if (response.ok) {
        return response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Erro ao buscar o nome do usuário');
    }
};

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/user/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const delUser = async (userID) => {
    const response = await fetch(`${BASE_URL}/user/deleteUser/${userID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
    }
};