## Trybe Futebol Clube

Neste projeto, foi desenvolvido um back-end dockerizado que utiliza modelagem de dados através do Sequelize, seguindo as regras de negócio preestabelecidas. A API criada é altamente funcional e pode ser facilmente consumida pelo front-end já criado.
Para adicionar uma partida, é imprescindível ter um token de autenticação, exigindo que a pessoa esteja logada para fazer as alterações. Ademais, existe um relacionamento estratégico entre as tabelas teams e matches, o que permite uma atualização dinâmica e confiável das partidas.

![gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWFkZjc4ZWIyNTJjODJmOGIxZTJiZWQ0YzZkNDkzYTFlOTRjZTNhNSZjdD1n/eK1sV7PDyQXAO5pzLa/giphy.gif)

## API

| Método HTTP | Endpoint   | Descrição               | 
| :---------- | :--------- | :---------------------- |
| POST        | `/login`   | Realiza o login com usuários do banco de dados e gera um token    
| GET         | `/login/role`| :lock: Retorna o tipo de usuário
| GET         | `/teams`   | Retorna a lista de todos os times do campeonato
| GET         | `/teams/:id` | Retorna o time conforme o id
| GET         | `/matches`   | Retorna todas as partidas 
| GET         | `/matches?inProgress=true` | Retorna todas as partidas em andamento
| GET         | `/matches?inProgress=false`| Retorna todas as partidas encerradas
| PATCH       | `/matches/:id`    | :lock: Atualiza a partida de acordo com o id passado no parâmetro
| PATCH       | `/matches/:id/finish` | :lock: Encerra uma partida
| POST         | `/matches`           | :lock: Insere uma nova partida
| GET          | `/leaderboar/home`   | Retorna a classificação dos times mandantes
| GET          | `/leaderboard/away`  | Retorna a classificação dos times visitantes
| GET          | `/leaderboard`       | Retorna a classificação geral

:lock: As rotas com cadeados somente pode ser acessadas com token válido gerado no login através do headers com o título "Authorization" :key:.

### Corpo das requisições

- POST `/login`

```json
{
  "email": "string",
  "password": "string"
}
```

- POST `/matches`

```json
{
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```

- PATCH `/matches/:id`

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```
## Tecnologias
* Node.js
* Sequelize
* TypeScript
* JSON Web Token(JWT)
* Docker
* docker-compose

## Instalando Dependências

Clone o projeto

```bash
  git clone git@github.com:victorhdoliveira/trybe-futebol-clube.git
```
Instale as dependências

```bash
  npm install
```
### Com Docker

1. Na raíz do projeto, rode os serviços node e db com o seguinte comando: 
```bash
npm run compose:up -d
```
2. Abra o terminal interativo do container:
```bash
docker exec -it app_backend sh
```
3. Instale as dependências dentro do container:
```bash
npm install
```

## Testes

Para rodar os testes de integração, rode o seguinte comando dentro do container

```bash
  npm test
```
