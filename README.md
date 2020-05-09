# LinkAPI Backend Challenge

## Intro

Challenge proposed by LinkAPI in a selection process for a vacancy in Back-end Developer that consists of developing a backend application, with the requirements:

-   Create test accounts on Pipedrive and Bling platforms.

-   Create an integration between Pipedrive and Bling platforms. (The integration must search for opportunities with status equal to earned in Pipedrive, then insert them as requested in Bling).

-   Create mongo database, there are services like MongoDB Atlas to create for free.

-   Create a collection in the MongoDB database, adding the opportunities inserted in Bling by day and total value.

-   Create endpoint to bring the consolidated data from the MongoDB collection.

-   Develop and version the project using git.

-   Use GitHub to host the code.

-   Send the repository link to people@linkapi.com.br

First of all, I would like to thank the opportunity to be able to take the test and have the chance to join a company as innovative and commented as LinkAPI.

## Project Behavior

-   **INFRASTRUCTURE**

    Docker was used to facilitate the environment, in this case the database and its initialization as the creation of the DB and collections for later import and creation of data. Beyond in also createion of redis for gerenciate background jobs.

-   **AUTENTHICATION**

    Due to the fact that the security of an API is essential, I performed the implementation of authentication with JWT being necessary in the header of each request in the Authorization field to insert the JWT token.

*   **DATA PERSISTENCE**

    I use the NoSQL MongoDB as was a requested in the challenge.

-   **API REST**

    For the exhibition of the routes in the REST model with JSON format I used the Express micro-framework for being very lean, simple to work with and for having much more contact. I could have used Hapi or another, without any problem.

-   **TESTS**

    To perform unit and integration tests, the JEST and Supertest were used. I could also have used the Mocha and Chai.

-   **OTHERS**

    I used some libs for formatting, indenting and standardizing code.

-   **BACKGROUND JOBS**

    I have 1 Job that runs for a cron every 10 minutes, which captures the pipedrive offers with a status of 'earned' and then they are sent to a job that performs the insertion of the offer in the bling as a sales order and also saves it to MongoDB.

# End-points

### Token

| resource             | description                            |
| :------------------- | :------------------------------------- |
| `/sessions` **POST** | Post credentials and return JWT token. |

`/sessions` **POST** - BODY

```shell
{
	"email": "lin@kapi.com",
	"password": "123456"
}
```

`/sessions` **POST** - 422 RESPONSE

```shell
{
  "error": "Incorrect E-mail/Password Combination."
}
```

`/sessions` **POST** - 200 RESPONSE

```shell
  {
  "user": {
    "name": "LinkApi",
    "email": "lin@kapi.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODg0NzA2ODMsImV4cCI6MTU4ODQ3MDc2OSwic3ViIjoiM2MxMzZhMzQzNTkxZTJhYTNjNzBhOGJjIn0.1aM8x6btpovCA9FZU12swp44v_gT_c_aVyfLkpYmh-0"
}
```

### Users

| resource         | description     |
| :--------------- | :-------------- |
| `/users` **GET** | Read all users. |

`/users` **GET** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "Users not found."
}
```

`/users` **GET** - 200 RESPONSE

```shell
  [
  {
    "_id": "3c136a343591e2aa3c70a8bc",
    "name": "LinkApi",
    "email": "lin@kapi.com",
    "__v": 0,
    "createdAt": "2020-05-03T01:52:02.728Z",
    "updatedAt": "2020-05-03T01:52:02.728Z"
  },
  {
    "_id": "f9036a343149e25a3c70a8bc",
    "name": "Harbs",
    "email": "jp@harbs.com",
    "__v": 0,
    "createdAt": "2020-05-01T03:51:00.728Z",
    "updatedAt": "2020-05-01T03:51:00.728Z"
  }
]
```

| resource                  | description            |
| :------------------------ | :--------------------- |
| `/users/{_id}` **DELETE** | Delete specified user. |

`/users/{_id}` **DELETE** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "User not found."
}
```

`/users/{_id}` **DELETE** - 204 RESPONSE

```shell
No body
```

| resource          | description  |
| :---------------- | :----------- |
| `/users` **POST** | Create user. |

`/users` **POST** - BODY

```shell
{
	"name": "LinkApi Test",
	"email": "linkapi@test.com",
	"password": "123456"
}
```

`/users` **POST** - 409 RESPONSE

```shell
{
  "status": 409,
  "message": "Email Address Already Used."
}
```

`/users` **POST** - 201 RESPONSE

```shell
{
  "_id": "5eaf53c4ebdf47338c45a60f",
  "name": "LinkApi Test",
  "email": "linkapi@test.com",
  "password": "$2a$08$jTDsXrcl8YSeNmQ8z7BWUeDO2nBSKBSZr8RKNodqhCm76i.RAty5m",
  "createdAt": "2020-05-03T23:29:08.565Z",
  "updatedAt": "2020-05-03T23:29:08.565Z",
  "__v": 0
}
```

### Orders

| resource          | description      |
| :---------------- | :--------------- |
| `/orders` **GET** | Read All Orders. |

`/orders` **GET** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "Oops, no Orders in DB! :/"
}
```

`/orders` **GET** - 200 RESPONSE

```shell
[
  {
    "_id": "5eb4b0f22fc6562b85f9ae72",
    "dealId": 2,
    "dealName": "Negócio fdsdf",
    "clientName": "fd",
    "status": "won",
    "date": "2020-05-07T02:26:11.000Z",
    "value": 0,
    "currency": "USD",
    "createdAt": "2020-05-08T01:08:02.167Z",
    "updatedAt": "2020-05-08T01:08:02.167Z",
    "__v": 0
  },
  {
    "_id": "5eb4b0f22fc6562b85f9ae73",
    "dealId": 3,
    "dealName": "Negócio Godevs",
    "clientName": "João",
    "status": "won",
    "date": "2020-05-07T04:35:26.000Z",
    "value": 3444,
    "currency": "USD",
    "createdAt": "2020-05-08T01:08:02.178Z",
    "updatedAt": "2020-05-08T01:08:02.178Z",
    "__v": 0
  },
  {
    "_id": "5eb4b0f22fc6562b85f9ae74",
    "dealId": 4,
    "dealName": "Negócio Linkapi",
    "clientName": "Thiago Lima",
    "status": "won",
    "date": "2020-05-07T04:28:38.000Z",
    "value": 350,
    "currency": "USD",
    "createdAt": "2020-05-08T01:08:02.186Z",
    "updatedAt": "2020-05-08T01:08:02.186Z",
    "__v": 0
  }
]
```

## Installation

### Prerequisites

To run the application it is necessary to have installed Node in version v13.7.0 or higher, Docker in version 19.03.5, build 633a0ea or higher, Docker-Compose in version 1.25.4, build 8d51620a or higher and Yarn in version 1.21.1.

### User to authenticate to the API

```shell
{
    "email": 'lin@kapi.com',
    "password": '123456',
}
```

### Phases

To run the application on your machine, follow these steps:

1. git clone [https://github.com/harbsprog/linkapi_backend_challenge.git](https://github.com/harbsprog/linkapi_backend_challenge.git)

2. cd linkapi_backend_challenge `Access the project folder`

3. yarn install `Performs installation of dependencies`

4. cp .env.example .env `Copy environment variables`

5. docker-compose up -d `Up the MongoDB and Init database with collections and credentials`

6. yarn importData `Create a user for testing in the API`

7. yarn start or yarn dev:server `Run the application`

8. Access: http://127.0.0.1:3000/ If you present a welcome message everything went well.

## Tests

To run the tests run the following command:
`yarn test`

## Author

[Harbs](https://github.com/harbsprog)
