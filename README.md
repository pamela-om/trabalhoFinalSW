# CSI606-2021-02 - Remoto - Trabalho Final - Resultados

## Aluna: Pâmela Miranda

---

### Resumo

Este documento apresenta o projeto desenvolvido para a disciplina CSI606-2021-02, abordando sua proposta, implementações realizadas e resultados alcançados. O projeto consiste em uma aplicação de biblioteca online que permite aos usuários realizar reservas/aluguéis de livros. O sistema inclui funcionalidades de cadastro e login de usuários, visualização de livros disponíveis, busca por título, aluguel e devolução de livros, além de gerenciamento de empréstimos.

### 1. Funcionalidades implementadas

- Cadastro e login de usuários (clientes).
- Visualização de todos os livros da biblioteca.
- Busca por título de livro.
- Aluguel de livros disponíveis.
- Devolução de livros alugados.
- Visualização de empréstimos do usuário, incluindo status (ativo ou devolvido).

### 2. Funcionalidades previstas e não implementadas

Uma funcionalidade prevista, mas não implementada, foi a parte de login do administrador para gerenciar livros e clientes. Isso demandaria mais implementações e tempo, portanto, foi deixado de lado para focar nas funcionalidades do cliente.

### 3. Outras funcionalidades implementadas

Uma funcionalidade adicional implementada após a proposta inicial foi a página de visualização de todos os livros fornecidos pela biblioteca, proporcionando uma visão abrangente do catálogo disponível.

### 4. Principais desafios e dificuldades

Um dos principais desafios encontrados foi a implementação do sistema de autenticação por token, já que não possuía experiência prévia com esse método. No entanto, através de pesquisas e estudos, foi possível superar essa dificuldade e integrar com sucesso a autenticação na aplicação.

### 5. Instruções para instalação e execução

Para instalar a aplicação, siga os passos abaixo:

1. Clone o repositório para sua máquina local.
2. Instale as dependências do projeto utilizando o comando `npm install` na pasta raiz.
3. Configure o banco de dados MySQL de acordo com as configurações fornecidas no arquivo `.env`.
4. Execute o servidor Node.js utilizando o comando `npm start` na pasta raiz.
5. Inicie o cliente React com o comando `npm start` na pasta `client`.


