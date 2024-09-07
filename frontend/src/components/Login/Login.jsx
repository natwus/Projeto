import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enviarEmail } from "./enviarEmail";
import { fetchUserName, loginUser } from "../../services/userService";

function Login() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigo(generatedCode);
    }, []);

    useEffect(() => {
        if (email) {
            const fetchNomeUsuario = async () => {
                try {
                    const data = await fetchUserName(email);
    
                    if (data.nome) {
                        setNome(data.nome);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o nome do usuário:', error);
                }
            };
    
            fetchNomeUsuario();
        }
    }, [email]);

    useEffect(() => {
        if (loginSuccess) {
            navigate('/mfa', { state: { codigo, email } });
        }
    }, [loginSuccess, navigate, codigo, email]);
    
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(email, senha);

            if (data.usuario) {
                alert('Login bem-sucedido!');
                enviarEmail(nome, codigo, email);
                setLoginSuccess(true);
            } else {
                alert('Email ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <input
                    type="password"
                    name="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to={"/cadastroUsuario"}>Não tem cadastro? </Link>
        </>
    );
}

export default Login;
