const BASE_URL = 'http://localhost:3001/api';

export async function updateUser(id, userData) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado.');
    }

    const response = await fetch(`${BASE_URL}/update/updateUsers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    if (response.status === 403) {
        throw new Error('Acesso negado. Verifique suas credenciais.');
    }

    return response.json();
}
