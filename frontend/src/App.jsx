import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUser from './components/Cadastro/cadastroUsuario';
import CadastroSup from './components/Cadastro/cadastroFornecedor';
import CadastroProd from './components/Cadastro/cadastroProduto';
import TabelaUser from './components/Tabela/tabelaUsuario';
import TabelaSup from './components/Tabela/tabelaFornecedor';
import TabelaProd from './components/Tabela/tabelaProduto';
import AlterarUser from './components/Alterar/alterarUsuario';
import AlterarSup from './components/Alterar/alterarFornecedor';
import AlterarProd from './components/Alterar/alterarProduto';
import Login from './components/Login/Login';
import Inicio from './components/Inicio/Inicio';
import MFA from './components/MFA/Mfa';
import Header from './components/Inicio/Header';
import Sidebar from './components/Inicio/Sidebar';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <BrowserRouter>
            <>
                <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
                <center style={{marginTop: '150px'}}>
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
                        <Route path="/alterarFornecedor" element={<AlterarSup />} />
                        <Route path="/alterarProduto" element={<AlterarProd />} />
                        <Route path="/mfa" element={<MFA />} />
                    </Routes>
                </center>
            </>
        </BrowserRouter>
    );
}

export default App;
