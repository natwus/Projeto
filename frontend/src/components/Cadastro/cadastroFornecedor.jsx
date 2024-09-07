import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategorias, registerSupplier } from '../../services/supplierService';
import useSessionTimeout from "../../hooks/useSessionTimeout";

function CadastroFornecedor() {
    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const navigate = useNavigate();

    useSessionTimeout();

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
            const data = await registerSupplier(nome, estado, telefone, email, categoriaSelecionada);

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
                <input
                    type="text"
                    name="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
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
            <Link to={"/inicio"}>Início</Link>
        </div>
    );
}

export default CadastroFornecedor;
