import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function useSessionTimeout(inactivityLimit = 120 * 60 * 1000) {
    let inactivityTimer;
    const navigate = useNavigate();

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(handleInactivityLogout, inactivityLimit);
    };

    const handleInactivityLogout = () => {
        alert('Sessão expirada por inatividade. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Você precisa estar logado!');
            navigate('/');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                alert('Sua sessão expirou. Por favor, faça login novamente.');
                localStorage.removeItem('token');
                navigate('/');
            } else {
                resetInactivityTimer();
                window.addEventListener('mousemove', resetInactivityTimer);
                window.addEventListener('keydown', resetInactivityTimer);
                window.addEventListener('scroll', resetInactivityTimer);
            }
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            localStorage.removeItem('token');
            navigate('/');
        }

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
            window.removeEventListener('scroll', resetInactivityTimer);
        };
    }, [navigate]);
}

export default useSessionTimeout;
