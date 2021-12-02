<h2 align="center">Desafio Node.js</h2>

## 🧰 Setup para rodar o projeto

- Criar um arquivo com o nome **.env** e colar o seguinte conteúdo: `FAUNADB_SECRET_KEY=fnAEZUdQWoAAREiKyFJZK1_f4W3_pavPIu9FAQAY`
- Instalar as dependências: rodar `npm install` no terminal
- Rodar o projeto: rodar `npm run dev` no terminal

## 💻 Stack utilizada

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fauna (DB)](https://fauna.com/)

## 🛣️ Rotas

**GET** ➡️ `/cyber-accounts/:id`

### _Resposta:_

```js
/*
As datas estão milisegundos

Os itens deposits e withdrawals são compostos por tuplas, onde o primeiro item da tupla é o valor do depósito e o segundo item é a data do depósito
*/

{
  "status": 200,
  "message": "Usuário encontrado!",
  "payload": {
    "cyberEmail": "test@cyber.com.en",
    "name": "Crud - Fauna 2",
    "accountType": "checking-account",
    "cyberId": "51e57154-b897-4895-a808-086f7be29220",
    "createdAt": 1638405955077,
    "balance": 1997.5999999999997,
    "updatedAt": 1638478336635,
    "deposits": [
      [
        1000,
        1638450333786
      ],
      [
        1000,
        1638479874329
      ]
    ],
    "withdrawals": [
      [
        300.3,
        1638452612812
      ]
    ]
  }
}
```

**POST** ➡️ `/cyber-accounts/`

### _Body esperado:_

```js
{
  "cyberEmail": "test@cyber.com.en",
  "name": "Post - test",
  "accountType": "saving-account"
}
```

**PUT** ➡️ `/cyber-accounts/:id`

### _Body esperado:_

```js
/*
Todos esses itens são editáveis na collection
*/

{
  "cyberEmail": "updated@cyber.com.en",
  "name": "Put - test",
  "accountType": "cheking-account"
}
```

**PUT** ➡️ `/delete/:id/cyber-accounts/`

```js
/* 
Essa rota é um soft delete, ela apenas seta duas propriedades no banco, elas são:
  - deleted: true
  - deletedAt: Date.now() - data atual
*/
```

**PUT** ➡️ `/deposit/:id/`

```js
/*
Essa rota soma o depósito com o saldo atual da cyberAccount e além disso registra o valor e data do depósito em um array deposits
*/

{
	"deposit": 1000
}
```

**PUT** ➡️ `/withdraw/:id/`

```js
/*
Essa rota subtrai o valor do saque e da taxa de saque do saldo atual da cyberAccount, mas apenas se esses valores forem menores que o saldo. O valor e data do saque ficam registrados em um array withdrawals
*/

{
	"withdraw": 300
}
```
