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

    let nomeUsuario;
    let message;
    if (token) {
        const decoded = jwtDecode(token);
        nomeUsuario = decoded.nome;
        message = `Olá, ${nomeUsuario} `;
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
        closeSidebar();
        navigate('/');
    };

    // Função para determinar o conteúdo da sidebar com base na rota
    const getSidebarContent = () => {
        switch (location.pathname) {
            case "/":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                    </>
                );
            case "/cadastroUsuario":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/cadastroProduto":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/cadastroFornecedor":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/produtos":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/usuarios":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/fornecedores":
                return (
                    <>
                        <SidebarButton onClick={closeSidebar} as={Link} to="/inicio">Home</SidebarButton>

                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            case "/inicio":
                return (
                    <>
                        {/* Botão do Dropdown de Cadastro */}
                        <SidebarButton as={Link} onClick={toggleCadastroDropdown}>
                            Cadastro
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Cadastro */}
                        {isCadastroDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroUsuario">Cadastro Usuário</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroProduto">Cadastro Produto</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/cadastroFornecedor">Cadastro Fornecedor</DropdownButton>
                            </>
                        )}

                        {/* Botão do Dropdown de Consulta */}
                        <SidebarButton as={Link} onClick={toggleConsultaDropdown}>
                            Consulta
                        </SidebarButton>

                        {/* Conteúdo do Dropdown de Consulta */}
                        {isConsultaDropdownOpen && (
                            <>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/produtos">Consultar Produtos</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/fornecedores">Consultar Fornecedores</DropdownButton>
                                <DropdownButton onClick={closeSidebar} as={Link} to="/usuarios">Consultar Usuários</DropdownButton>
                            </>
                        )}

                        <SidebarButton as={Link} onClick={handleLogoff} to='/'>Sair</SidebarButton>
                    </>
                );
            default:
                return (
                    <>
                        <SidebarButton as={Link} to="/inicio">Voltar</SidebarButton>
                    </>
                );
        }
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClick={closeSidebar} />
            <SidebarContainer isOpen={isOpen}>
                <h3>{message}</h3>
                {getSidebarContent()}
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
