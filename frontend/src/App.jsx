import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUser from './components/Cadastro/cadastroUsuario';
import CadastroSup from './components/Cadastro/cadastroFornecedor';
import CadastroProd from './components/Cadastro/cadastroProduto';
import Login from './components/Login/Login';
import Inicio from './components/Inicio/Inicio';
import MFA from './components/MFA/Mfa'; 
import Home from './components/Home/Home';                                                                                                                                                                                                                        
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/cadastroUsuario" element={<CadastroUser />} />
                <Route path="/cadastroFornecedor" element={<CadastroSup />} />
                <Route path="/cadastroProduto" element={<CadastroProd />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mfa" element={<MFA />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
