# Cash Mind API

## Descrição
O Cash Mind API é uma aplicação desenvolvida para auxiliar no gerenciamento de transações financeiras. Ela permite aos usuários registrar, editar e excluir transações, bem como visualizar relatórios mensais de gastos. A API também suporta autenticação via credenciais e OAuth com Google. 
Essa aplicação foi desenvolvida para estudar as funcionalidades do NodeJs e das bibliotecas usadas, caso tenha algum feedback sobre arquitetura, segurança, etc. Entre em contato: [Email](mailto:lian.mendes26@gmail.com?subject=Ol%C3%A1,+Gostaria+de+enviar+um+feedback) ou [Linkedin](https://www.linkedin.com/in/lian-souza-miranda-mendes).

## Tecnologias Utilizadas
A API foi desenvolvida utilizando as seguintes tecnologias:

- **Node.js** - Plataforma de execução JavaScript
- **Express** - Framework para criação de APIs
- **Sequelize** - ORM para interação com banco de dados
- **MySQL2** - Conector para MySQL
- **JWT (jsonwebtoken)** - Autenticação segura com tokens JWT
- **Passport e passport-google-oauth20** - Autenticação via OAuth com Google
- **bcrypt** - Hashing de senhas
- **pdfmake** - Geração de relatórios em PDF
- **dotenv** - Gerenciamento de variáveis de ambiente
- **supertest** - Testes de integração

## Endpoints

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário
- `GET /auth/google` - Autenticação via Google (abrir no navegador)
- `GET /auth/google/callback` - Callback do OAuth Google (abrir no navegador)

### Transações
- `POST /transaction` - Criar nova transação
- `PUT /transaction/:id` - Atualizar uma transação existente
- `DELETE /transaction/:id` - Excluir uma transação
- `GET /transactions` - Listar todas as transações
- `GET /transaction/:id` - Buscar transação por ID
- `GET /transactions/date/:userId` - Listar transações por data
- `GET /transactions/category/:userId` - Listar transações por categoria
- `GET /transactions/type/:userId` - Listar transações por tipo
- `GET /transactions/report/:userId/:month-:year` - Gerar relatório financeiro (abrir no navegador)

### Usuários
- `GET /users` - Listar todos os usuários
- `GET /user/:id` - Buscar usuário por ID
- `GET /user/email/:email` - Buscar usuário por e-mail
- `PUT /user/update/:id` - Atualizar informações do usuário
- `DELETE /user/delete/:id` - Excluir usuário

## Instalação e Execução
1. Clone este repositório:
   ```sh
   git clone https://github.com/LianMiranda/cash-mind-api.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`
5. Inicie o servidor:
   ```sh
   npm run dev
   ```

## Contribuição
Sinta-se à vontade para abrir issues e pull requests para melhorias no projeto. Caso tenha algum feedback, entre em contato: [Email](lian.mendes26@gmail.com) ou [Linkedin](www.linkedin.com/in/lian-souza-miranda-mendes).

