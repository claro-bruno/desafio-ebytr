# Bem-vindos ao Auto Trybe Backend

## Contexto

---

Esse projeto foi desenvolvido para uma vaga de backend na empresa [`Ebytr `](www.betrybe.com).

A proposta era desenvolver uma aplicação fullstack que gerencia a lista de tarefas de seus colaboradores.


---

---

## Como instalar

Pre-requisitos para rodar o projeto: 
- mongoDB
- NPM

Copie o ssh do projeto `git@github.com:claro-bruno/desafio-auto-trybe-back.git`

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `git clone git@github.com:pauloricardoz/desafio-auto-trybe-back.git`
  * `cd desafio-ebytr/back-end`
  * `npm install`
  * `npm start`
  * `cd ../front-end`
  * `npm install`
  * `npm start`

  A aplicação front-end está configurada para rodar na porta local 3000 e a back-end na porta 3001.

---

## Modo de utilização

A API consta com 2 rotas: 
* `/users` => Para as demais funcionalidades
  * `/login` [`POST`]  faz o login do usuário
  * `/` [`POST`] Insere um novo usuário
* `/tasks` => Para a funcionalidade de tarefas
  * `/` [`POST`]  cria uma nova task
  * `/` [`PUT`]  alterar uma task
  * `/` [`DELETE`]  remove uma task
  * `/` [`GET`]  retorna todas as tarefas de um determinado usuário
  * `/` [`GET`]  retorna uma tarefa de um id específico
  

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha/Chai para a criação dos teste unitários e de integração. Foi utilizado styled-components no front-end e o axios.

---

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

---

## Próximos passos

* Implementação do Swagger para documentação da API
* Deplay no Heroku
* Acabar os testes

---

## Contatos

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div>
    <h2> Bruno Augusto Claro </h2>
  <div style="display: flex; align-items: center;">
    <img src="./images/linkedIn_logo.jpg" alt="LinkedIn" style="width:20px;"/>  /in/brunoaugustoclaro
  </div>
  <br/>
  <div style="display: flex;align-items: center;">
    <img src="./images/github_logo.png" alt="LinkedIn" style="width:20px;"/> https://github.com/claro-bruno
  </div>
  <br/>
  Email: brunaugusto@gmail.com
  
<br/>