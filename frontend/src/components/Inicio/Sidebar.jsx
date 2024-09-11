import React, { useState } from "react";
import { SidebarContainer, SidebarButton, Overlay, DropdownButton } from './styles';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSessionTimeout from '../../hooks/useSessionTimeout';
import { jwtDecode } from "jwt-decode";

// Definição das rotas e opções da sidebar
const sidebarRoutes = [
    {
        path: "/",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            }
        ]
    },
    {
        path: "/cadastroUsuario",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/cadastroProduto",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/cadastroFornecedor",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/produtos",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/usuarios",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Produtos", link: "/produtos" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/fornecedores",
        buttons: [
            { label: "Home", link: "/inicio" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    },
    {
        path: "/inicio",
        buttons: [
            { label: "Login", link: "/" },
            {
                label: "Cadastro",
                dropdown: true,
                options: [
                    { label: "Cadastro Usuário", link: "/cadastroUsuario" },
                    { label: "Cadastro Produto", link: "/cadastroProduto" },
                    { label: "Cadastro Fornecedor", link: "/cadastroFornecedor" }
                ]
            },
            {
                label: "Consulta",
                dropdown: true,
                options: [
                    { label: "Consultar Produtos", link: "/produtos" },
                    { label: "Consultar Fornecedores", link: "/fornecedores" },
                    { label: "Consultar Usuários", link: "/usuarios" }
                ]
            },
            { label: "Sair", action: "logoff" }
        ]
    }
];

// Componente Sidebar
const Sidebar = ({ isOpen, closeSidebar }) => {
    const location = useLocation();
    const [isCadastroDropdownOpen, setCadastroDropdownOpen] = useState(false);
    const [isConsultaDropdownOpen, setConsultaDropdownOpen] = useState(false);
    const token = localStorage.getItem('token');

    let nomeUsuario;
    let menssage;
    if (token) {
        const decoded = jwtDecode(token);
        nomeUsuario = decoded.nome;
        menssage = `Olá, ${nomeUsuario}`
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
        navigate('/'); // Redireciona para a página de login
    };

    // Obtém o conteúdo baseado na rota atual
    const getSidebarContent = () => {
        const routeConfig = sidebarRoutes.find(route => route.path === location.pathname);

        if (routeConfig) {
            return routeConfig.buttons.map((button, index) => {
                if (button.dropdown) {
                    return (
                        <div key={index}>
                            <SidebarButton as={Link} onClick={button.label === "Cadastro" ? toggleCadastroDropdown : toggleConsultaDropdown}>
                                {button.label}
                            </SidebarButton>
                            {(button.label === "Cadastro" ? isCadastroDropdownOpen : isConsultaDropdownOpen) &&
                                button.options.map((option, idx) => (
                                    <DropdownButton key={idx} as={Link} to={option.link}>
                                        {option.label}
                                    </DropdownButton>
                                ))}
                        </div>
                    );
                }
                if (button.action === "logoff") {
                    return (
                        <SidebarButton key={index} onClick={handleLogoff}>
                            {button.label}
                        </SidebarButton>
                    );
                }
                return (
                    <SidebarButton key={index} as={Link} to={button.link}>
                        {button.label}
                    </SidebarButton>
                );
            });
        }

        return <SidebarButton as={Link} to="/inicio">Voltar</SidebarButton>;
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClick={closeSidebar} />
            <SidebarContainer isOpen={isOpen}>
                <h3>Olá {nomeUsuario}</h3>
                {getSidebarContent()}
            </SidebarContainer>
        </>
    );
};

export default Sidebar;