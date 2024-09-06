const BASE_URL = 'http://localhost:3001/api';

export async function getUserById(id) {
    const response = await fetch(`${BASE_URL}/get/userById/${id}`);
    return response.json();
}