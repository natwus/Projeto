import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPermissoes, registerUser } from '../../services/userService';
import { jwtDecode } from "jwt-decode";
import zxcvbn from 'zxcvbn';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaForte, setSenhaForte] = useState(false);
    const [senhaFeedback, setSenhaFeedback] = useState('');
    const [permissoes, setPermissoes] = useState([]);
    const [permissaoSelecionada, setPermissaoSelecionada] = useState('')
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPermissoes = async () => {
            try {
                const permissao = await getPermissoes();
                setPermissoes(permissao);
            } catch (error){
                console.error('Erro ao buscar permissoes:', error);
            }
        };

        fetchPermissoes();
    }, [])

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

    const possuiLetraMaiuscula = (senha) => {
        const regexMaiuscula = /[A-Z]/;
        return regexMaiuscula.test(senha);
    };

    const possuiCaractereEspecial = (senha) => {
        const regexEspecial = /[^a-zA-Z0-9]/;
        return regexEspecial.test(senha);
    };

    const validarSenha = (senha) => {
        const result = zxcvbn(senha);
        let feedback = '';

        if (senha.length < 8) {
            feedback = 'A senha deve ter pelo menos 8 caracteres.';
        } else if (!possuiLetraMaiuscula(senha)) {
            feedback = 'A senha deve conter pelo menos uma letra maiúscula.';
        } else if (!possuiCaractereEspecial(senha)) {
            feedback = 'A senha deve conter pelo menos um caractere especial.';
        } else if (result.score >= 3) {
            feedback = 'Senha forte!';
        }

        setSenhaForte(result.score >= 3 && possuiLetraMaiuscula(senha) && possuiCaractereEspecial(senha));
        setSenhaFeedback(feedback);
    };

    const enviarDados = async (event) => {
        event.preventDefault();

        if (senhaForte) {
            try {
                const data = await registerUser(nome, email, senha, permissaoSelecionada, emailLogado);

                if (data.sucess) {
                    alert('Cadastro realizado!');
                    navigate('/usuarios');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
            }
        } else {
            alert('A senha deve ser forte!');
        }
    };

    return (
        <div>
            <h1>Cadastro Usuário</h1>
            <form onSubmit={enviarDados}>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
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
                    name="senha"
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value);
                        validarSenha(e.target.value);
                    }}
                />
                {senha && (
                    <div>
                        <p style={{ color: senhaForte ? 'green' : 'red' }}>
                            {senhaFeedback}
                        </p>
                    </div>
                )}
                
                <label>Permissão</label>
                <select
                    name="permissao"
                    value={permissaoSelecionada}
                    onChange={(e) => setPermissaoSelecionada(e.target.value)}
                >
                    <option value="">Selecione a permissão</option>
                    {permissoes.map((permissao) => (
                        <option key={permissao.permissaoID} value={permissao.permissaoID}>
                            {permissao.permissaoNome}
                        </option>
                    ))}
                </select>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
