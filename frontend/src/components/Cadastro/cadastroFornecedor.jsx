import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategorias, getEstados, registerSupplier } from '../../services/supplierService';
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { jwtDecode } from "jwt-decode";

function CadastroFornecedor() {
    const [nome, setNome] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    let emailLogado;
    if (token) {
        const decoded = jwtDecode(token);
        emailLogado = decoded.id
    }

    useSessionTimeout();

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const estado = await getEstados();
                setEstados(estado);
            } catch (error) {
                console.error('Erro ao buscar estados:', error);
            }
        };

        fetchEstados();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categorias = await getCategorias();
                setCategorias(categorias);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const enviarDados = async (event) => {
        event.preventDefault();

        try {
            const data = await registerSupplier(nome, estadoSelecionado, telefone, email, categoriaSelecionada, emailLogado);

            if (data.sucess) {
                alert('Cadastro realizado!');
                navigate('/fornecedores')
            } else {
                alert('Erro: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro Fornecedor</h1>
            <form onSubmit={enviarDados}>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Estado</label>
                <select
                    name="estado"
                    value={estadoSelecionado}
                    onChange={(e) => setEstadoSelecionado(e.target.value)}
                >
                    <option value="">Selecione o Estado</option>
                    {estados.map((estado) => (
                        <option key={estado.estadoID} value={estado.estadoID}>
                            {estado.estadoNome}
                        </option>
                    ))}
                </select>
                <label>Telefone</label>
                <input
                    type="text"
                    name="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <label>E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Categoria</label>
                <select
                    name="categoria"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nomeCategoria}
                        </option>
                    ))}
                </select>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroFornecedor;
