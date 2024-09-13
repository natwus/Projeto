# Sacolão Senai

## Descrição
Projeto desenvolvido em sala de aula no Senai Votuporanga com o objetivo de gerenciar o estoque de um supermercado. Ele permite o cadastro, alteração e exclusão de usuários, fornecedores e produtos, além de controlar permissões de usuários.

## Funcionalidades Principais
- **Cadastro, alteração e exclusão de usuários, fornecedores e produtos.**
- **Permissões de usuário:**
  - Visualizador: pode apenas visualizar as tabelas.
  - Padrão (funcionário): pode cadastrar e alterar produtos.
  - Administrador: tem permissão completa para gerenciar usuários, fornecedores e produtos.

## Requisitos
- **Node.js:** v20.12.0
- **MySQL:** 10.4.32 (MariaDB)
- **npm (frontend):**
  - `@emailjs/browser@4.4.1`
  - `@testing-library/react@13.4.0`
  - `react@18.3.1`, entre outras.
- **npm (backend):**
  - `express@4.19.2`
  - `jsonwebtoken@9.0.2`
  - `mysql2@3.11.0`, entre outras.

## Instalação
### Passo a passo para configurar o ambiente:

1. **Instalar MySQL Workbench e XAMPP:**
   - Baixe e instale o MySQL Workbench e XAMPP.
   - Inicie o Apache e o MySQL através do XAMPP Control Panel.

2. **Configurar o banco de dados:**
   - Abra o arquivo `projeto.mwb` no MySQL Workbench.
   - Execute um Forward Engineer (Ctrl + G) para criar as tabelas.
   - Cadastre manualmente os estados, categorias do fornecedor, e as permissões dos usuários:
     - `1 - Visualizador`
     - `2 - Padrão`
     - `3 - Administrador`

3. **Configurar variáveis de ambiente:**
   - Crie um arquivo chamado `credentials.env` dentro da pasta `backend` com as seguintes informações:
     ```
     DB_HOST=seu_host
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_DATABASE=nome_do_banco
     JWT_SECRET=valor_gerado_com_openssl_rand_32
     ```
   - Para gerar o `JWT_SECRET`, use o seguinte comando:
     ```bash
     openssl rand -base64 32
     ```

4. **Instalar as dependências do projeto:**
   - No diretório `frontend`, execute:
     ```bash
     npm install
     ```
   - No diretório `backend`, execute:
     ```bash
     npm install
     ```

5. **Iniciar o projeto:**
   - No `frontend`, inicie o projeto com:
     ```bash
     npm start
     ```
   - No `backend`, inicie o servidor com:
     ```bash
     npm start
     ```

## Estrutura de Pastas

├── backend # Backend do projeto 
│ 
├── config # Conexões e configurações 
│ 
├── controllers # Lógica de negócio 
│ 
├── middleware # Middlewares de autenticação e upload 
│ 
├── routes # Rotas da API 
│ 
└── server.js # Ponto de entrada do servidor 
├── frontend # Frontend do projeto 
│ 
├── public # Arquivos estáticos 
│ 
└── src # Código-fonte React 
│ 
├── components # Componentes reutilizáveis 
│ 
├── hooks # Hooks customizados 
│ 
└── App.jsx # Componente principal 
└── projeto.mwb # Modelo do banco de dados