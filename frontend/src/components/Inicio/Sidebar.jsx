import React, { useState } from "react";
import { SidebarContainer, SidebarButton, Overlay, DropdownButton } from './styles';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from "jwt-decode";

// Componente Sidebar
const Sidebar = ({ isOpen, closeSidebar }) => {
    const location = useLocation();
    const [isCadastroDropdownOpen, setCadastroDropdownOpen] = useState(false);
    const [isConsultaDropdownOpen, setConsultaDropdownOpen] = useState(false);
    const token = localStorage.getItem('token');

    let emailUsuario = '';
    if (token) {
        const decoded = jwtDecode(token);
        emailUsuario = decoded.id
    }

    // Funções para alternar a visibilidade dos dropdowns
    const toggleCadastroDropdown = () => {
        setCadastroDropdownOpen(!isCadastroDropdownOpen);
    };

    const toggleConsultaDropdown = () => {
        setConsultaDropdownOpen(!isConsultaDropdownOpen);
    };

    const navigate = useNavigate();

    useSessionTimeout();

    const handleLogoff = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Função para determinar o conteúdo da sidebar com base na rota
    const getSidebarContent = () => {
        switch (location.pathname) {
            case "/":
                return (
                    <>
                        <SidebarButton as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                    </>
                );
            case "/cadastroUsuario":
                return (
                    <>
                        <SidebarButton as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/cadastroProduto":
                return (
                    <>
                        <SidebarButton as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/cadastroFornecedor":
                return (
                    <>
                        <SidebarButton as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/produtos":
                return (
                    <>
                        <SidebarButton as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/usuarios":
                return (
                    <>
                        <SidebarButton as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/fornecedores":
                return (
                    <>
                        <SidebarButton as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            case "/inicio":
                return (
                    <>
                        <SidebarButton as={Link} to="/">Login</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff}>Sair</SidebarButton>
                    </>
                );
            default:
                return (
                    <>
                        <h3>Usuario Logado: {emailUsuario}</h3>
                        <SidebarButton as={Link} to="/inicio">Voltar</SidebarButton>
                    </>
                );
        }
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClick={closeSidebar} />
            <SidebarContainer isOpen={isOpen}>
                {getSidebarContent()}
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
