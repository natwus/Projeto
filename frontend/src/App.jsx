import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUser from './components/Cadastro/cadastroUsuario';
import CadastroSup from './components/Cadastro/cadastroFornecedor';
import CadastroProd from './components/Cadastro/cadastroProduto';
import TabelaUser from './components/Tabela/tabelaUsuario'
import TabelaSup from './components/Tabela/tabelaFornecedor';
import TabelaProd from './components/Tabela/tabelaProduto';
import AlterarUser from './components/Alterar/alterarUsuario'
import Login from './components/Login/Login';
import Inicio from './components/Inicio/Inicio';
import MFA from './components/MFA/Mfa';                                                                                                                                                                                                                        
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/cadastroUsuario" element={<CadastroUser />} />
                <Route path="/cadastroFornecedor" element={<CadastroSup />} />
                <Route path="/cadastroProduto" element={<CadastroProd />} />
                <Route path="/usuarios" element={<TabelaUser />} />
                <Route path="/fornecedores" element={<TabelaSup />} />
                <Route path="/produtos" element={<TabelaProd />} />
                <Route path="/alterarUsuario" element={<AlterarUser />} />
                <Route path="/mfa" element={<MFA />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
