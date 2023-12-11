# NestJS Authentication

![Workflow Test](https://github.com/anilahir/nestjs-authentication-and-authorization/actions/workflows/ci.yml/badge.svg)
![Prettier](https://img.shields.io/badge/Code%20style-prettier-informational?logo=prettier&logoColor=white)
[![GPL v3 License](https://img.shields.io/badge/License-GPLv3-green.svg)](./LICENSE)
[![HitCount](https://hits.dwyl.com/anilahir/nestjs-authentication-and-authorization.svg)](https://hits.dwyl.com/anilahir/nestjs-authentication-and-authorization)

## Description

NestJS Authentication with Authorization

## Features

1. Register
2. Access and Refresh token
3. Show user profile
4. Show users list
5. Reset user password
6. Grant user permissions
7. Update user
8. Delete user

## Technologies stack:

- JWT
- Bcrypt
- TypeORM + Postgresql

## Setup

### 1. Install the required dependencies

```bash
$ npm install
```

### 2. Rename the .env.example filename to .env and set your local variables

```bash
$ mv .env.example .env
```

### 3. Start the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger documentation

- [localhost:3007/api-docs](http://localhost:3007/api-docs)

## Author

👤 **Sumit Kumar**

- Github: [@sumit](https://github.com/sumit-kumar100)
- LinkedIn: [@sumit](https://www.linkedin.com/in/sumit-kumar100)

## Show your support

Give a ⭐️ if this project helped you!

## License

Release under the terms of [MIT](./LICENSE)
