import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFornecedores } from '../../services/supplierService'
import { registerProduct } from '../../services/productService'

function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [fornecedor, setFornecedor] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('Você precisa estar logado!')
            navigate('/'); 
        }
    }, [navigate]);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const fornecedor = await getFornecedores();
                setFornecedor(fornecedor);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };

        fetchFornecedores();
    }, []);

    const enviarDados = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('quantidade', quantidade);
        formData.append('preco', preco);
        formData.append('imagem', imagem);
        formData.append('fornecedorSelecionado', fornecedorSelecionado);

        console.log(nome, quantidade, preco, imagem, fornecedorSelecionado)

        try {
            const data = await registerProduct(formData);

            if (data.sucess) {
                alert('Cadastro realizado!');
                navigate('/produtos');
            } else {
                alert('Erro: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro Produto</h1>
            <form onSubmit={enviarDados}>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Quantidade</label>
                <input
                    type="text"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />
                <label>Preço</label>
                <input
                    type="text"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <label>Imagem</label>
                <input
                    type="file"
                    name="imagem"
                    onChange={(e) => setImagem(e.target.files[0])}
                />
                <label>Fornecedor</label>
                <select
                    name="fornecedor"
                    value={fornecedorSelecionado}
                    onChange={(e) => setFornecedorSelecionado(e.target.value)}
                >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedor.map((fornecedor) => (
                        <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                            {fornecedor.fornecedorNome}
                        </option>
                    ))}
                </select>
                <button type="submit">Cadastrar</button>
            </form>
            <Link to={"/inicio"}>Início</Link>
        </div>
    );
}

export default CadastroProduto;
