## Nodejs Template


### Introduction

This is a template for a Node.js project. It includes a basic folder structure, a set of tools, and a basic setup for authentication and authorization. This template is intended to be used as a starting point for new Node.js projects.

### Project Folder Structure
Here is a suggested folder structure for this project:

- `src/`: This is where all the source code goes.
    - `services/`: This folder contains all the service files.
    - `controllers/`: This folder contains all the controller files.
    - `models/`: This folder contains all the model files.
    - `routes/`: This folder contains all the route files.
    - `utils/`: This folder contains utility files, like the higher-order functions for error handling.
- `tests/`: This folder contains all the test files.
- `public/`: This folder contains all the static files like images, styles, and JavaScript files.
- `views/`: This folder contains all the view (template) files.

```markdown
.
├── src/
│   ├── api.js
│   ├── controllers/
│   │   ├── index.js
│   ├── middlewares/
│   ├── routes/
│   │   └── index.js
│   ├── services/
│   │   ├── index.js
│   └── utils/
│       ├── catchedAsync.js
│       └── index.js
├── index.js
├── package.json
└── README.md
```

### Tools

* [![NodeJS.org][NodeJS.org]][NodeJS-url]
* [![ExpressJS.com][ExpressJS.com]][ExpressJS-url]
* [![Docker.com][Docker.com]][Docker-url]
* [![JWT.io][JWT.io]][JWT-url]
* [![PassportJS.com][PassportJS.com]][PassportJS-url]


## Authentication and Authorization

This project uses Passport.js and JSON Web Tokens (JWT) for both authentication and authorization.

### Authentication

Authentication is the process of verifying who a user is. In this project, we're using the Passport.js 'local' strategy for login. The 'local' strategy authenticates users using an email and password. When a user tries to log in, Passport.js will take the email and password from the request, and pass them to a verify callback. The verify callback will then check if a user with the given email and password exists in the database.

### Session Management

We're using JWT for session management. When a user logs in, a JWT is created and sent to the user. The JWT contains a payload, which is a set of data that includes information about the user. The JWT is signed with a secret key, which ensures that the token hasn't been tampered with.

### Authorization

Authorization is the process of verifying what a user has access to. After a user is authenticated, each subsequent request must include the JWT in the 'Authorization' header. Passport.js will then use the 'jwt' strategy to verify the token. If the token is valid, the request is authenticated and the route handler is executed. If the token is not valid, the request is not authenticated and an error is returned. This process ensures that users can only access the resources they are allowed to.

### Contributors

- [estebance](https://github.com/estebance)
- [ivan](https://github.com/ivanlopeztbbc)
- [julian](https://github.com/bitjep)

### License

ISC



[NodeJS.org]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white (NodeJS.org)
[NodeJS-url]: https://nodejs.org/es/ (NodeJS.org)

[Docker.com]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white (Docker.com)
[Docker-url]: https://www.docker.com/ (Docker.com)


[ExpressJS.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge (ExpressJS.com)
[ExpressJS-url]: https://expressjs.com/ (ExpressJS.com)

[JWT.io]: https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white (JWT.io)
[JWT-url]: https://jwt.io/ (JWT.io)

[PassportJS.com]: https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white (PassportJS.com)
[PassportJS-url]: http://www.passportjs.org/ (PassportJS.com)

