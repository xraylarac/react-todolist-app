## 🧰 Setup to run the project

- Create a file named **.env** and paste the following content: `FAUNADB_SECRET_KEY=fnAEZUdQWoAAREiKyFJZK1_f4W3_pavPIu9FAQAY`
- Install dependencies: run `npm install` in terminal
- Run project: run `npm run dev` in terminal

## 💻 Stack used

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fauna (DB)](https://fauna.com/)

## 🛣️ Routes

- base route: `http://localhost:5000/`
- id's for testing routes: `316824203878727746` and `316824203878727746`

**GET** ➡️ `/cyber-accounts/:id`

### _Reply:_

```js
/*
Dates are in milliseconds

The deposits and withdrawals items are composed of tuples, where the first item of the tuple is the deposit amount.
and the second item is the filing date
*/

{
  "status": 200,
  "message": "User found!",
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

### _Expected Body:_

```js
{
  "cyberEmail": "test@cyber.com.en",
  "name": "Post - test",
  "accountType": "saving-account"
}
```

**PUT** ➡️ `/cyber-accounts/:id`

### _Expected Body:_

```js
/*
All these items are editable in the collection
*/

{
  "cyberEmail": "updated@cyber.com.en",
  "name": "Put - test",
  "accountType": "checking-account"
}
```

**PUT** ➡️ `/delete/:id/cyber-accounts/`

```js
/*
This route is a soft delete, it just sets two properties in the database, they are:
  - deleted: true
  - deletedAt: Date.now() - current date
*/
```

**PUT** ➡️ `/deposit/:id/`

```js
/*
This route adds the deposit to the current cyberAccount balance and in addition
records the deposit amount and date in a deposits array
*/

{
"deposit": 1000
}
```

**PUT** ➡️ `/withdraw/:id/`

```js
/*
This route subtracts the withdrawal amount and withdrawal fee from the current cyberAccount balance,
but only if these amounts are less than the balance.
The amount and date of withdrawal are recorded in an array withdrawals
*/

{
"withdraw": 300
}
```
