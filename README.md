Site Moraes Contabilidade

Este projeto é uma aplicação web para uma empresa de contabilidade fictícia chamada Moraes Contabilidade. 
O sistema permite que os usuários enviem comentários, 
visualizem os detalhes dos comentários e realizem operações básicas como alterar ou deletar registros.

Estrutura do Projeto
Backend: Utiliza Node.js com o ORM Sequelize para interagir com um banco de dados MySQL.
Frontend: HTML e CSS utilizando o framework Bootstrap para o design responsivo e estilizado.
Funcionalidades
Envio de Comentários: Os usuários podem enviar comentários e visualizar uma confirmação de envio.
Gerenciamento de Comentários: Os comentários podem ser visualizados, alterados ou deletados.
Informações da Empresa: Páginas sobre a empresa, sua história e missão estão disponíveis para visualização.
Pré-requisitos
Antes de começar, você precisará ter os seguintes softwares instalados:

Node.js (versão 14 ou superior)
MySQL
Configuração do Ambiente
Clone o Repositório

bash
Copiar código
git clone https://github.com/seu-usuario/moraes-contabilidade.git
cd moraes-contabilidade
Instale as Dependências

Navegue até o diretório do projeto e execute:

bash
Copiar código
npm install
Configuração do Banco de Dados

Certifique-se de que o MySQL está em execução e crie um banco de dados chamado postsite:

sql
Copiar código
CREATE DATABASE postsite;
Configuração do Sequelize

No arquivo config.js (ou onde você define a conexão com o banco de dados), ajuste as configurações de conexão:

javascript
Copiar código
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postsite', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = { Sequelize, sequelize };
Sincronize o Banco de Dados

Para criar as tabelas no banco de dados, execute:

bash
Copiar código
node sync.js
(Certifique-se de que você tem um arquivo sync.js que sincroniza o modelo com o banco de dados.)

Estrutura do Projeto
backend/: Contém o código do backend.

db.js: Configuração do Sequelize e conexão com o banco de dados.
models/: Contém os modelos Sequelize, como postagens.js.
sync.js: Script para sincronizar os modelos com o banco de dados.
frontend/: Contém os arquivos HTML e CSS.

index.html: Página inicial.
sobre.html: Página "Quem Somos".
contato.html: Página de contato.
servicos.html: Página com informações sobre os contadores.
Rodando o Projeto
Inicie o Servidor

No diretório do projeto, inicie o servidor Node.js:

bash
Copiar código
npm start
Isso iniciará o servidor no endereço http://localhost:3000 (ou na porta configurada).

Acesse o Frontend

Abra um navegador e navegue até http://localhost:3000 para acessar a aplicação web.

Contribuindo
Se você deseja contribuir para este projeto, siga estes passos:

Faça um fork do repositório.
Crie uma nova branch (git checkout -b feature/nova-feature).
Faça suas alterações e teste-as.
Envie um pull request.
Licença
Este projeto está licenciado sob a MIT License.

Contato
Para mais informações, entre em contato com cristiano.silveira@fatec.sp.gov.br
