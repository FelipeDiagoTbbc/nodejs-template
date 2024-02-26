# Nodejs Template


### Introduction

This is a template for a Node.js project. It includes a basic folder structure, a set of tools, and a basic setup for authentication and authorization. This template serves as a basic starting point for building Node.js applications using the MVC architectural pattern. It is intended to be used as a starting point for new Node.js projects.

## Run Locally

Clone the project

```bash
  git clone https://github.com/
```

Go to the project directory

```bash
  cd nodejs-template
```

Install dependencies

```bash
  npm install
```

Create an ENV file and provide environment variables

```bash
  .env
```
Start the server

```bash
  npm run start
```


## Tech Stack


**Server:** Node, Express, MongoDB 

### 📁 Project Folder Structure
Here is a suggested folder structure for this project:

- `src/`: This is where all the source code goes.
    - `services/`: This folder contains all the service files.
    - `controllers/`: This folder contains all the controller files.
    - `middlewares/`: This folder contains all the middleware files.
    - `routes/`: This folder contains all the route files.
    - `utils/`: This folder contains utility files, like the higher-order functions for error handling.
      - `auth/`: This subfolder contains files related to authentication and authorization, such as middleware for verifying tokens.
        - `strategies/`: This subfolder contains different authentication strategies, such as local, JWT, or OAuth.
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
│       ├── auth/
│       │   └── strategies/
├── index.js
├── package.json
└── README.md
```

### 🔒 Security Configurations

This project uses several security configurations to ensure the safety and reliability of the application:

1. **Helmet:** This is a middleware for Express.js that sets many HTTP headers to secure the application. It's being used for two main purposes:
  - **Content Security Policy (CSP):** Helmet is used to configure the CSP for the application. CSP is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. The directives defined in the CSP configuration specify the sources from which the application can load resources such as images, scripts, styles, fonts, etc. Notably, the `X-Frame-Options` header is now deprecated in favor of `frame-src` and `child-src` directives in the CSP.
  - **Security Headers:** Helmet sets a number of security headers. This includes setting the `X-Content-Type-Options`, `X-DNS-Prefetch-Control`, `X-Download-Options`, `X-Permitted-Cross-Domain-Policies`, `Referrer-Policy`, and `Expect-CT` headers.

3. **Cross-Origin Resource Sharing (CORS):** The application is configured to handle CORS, allowing or restricting requests from different origins based on the specified configuration. This is done using the `cors` middleware in Express.js.

4. **Validation** The application uses the `Joi` library for input validation. This is used to validate the request body, query parameters, and URL parameters.

5. **Error Handling:** The application uses a custom error handling middleware to handle errors. This middleware is used to catch errors and send an appropriate response to the client. It also logs the error to the console.

6. **Rate Limiting:** The application uses the `express-rate-limit` middleware to limit repeated requests to public APIs and/or endpoints such as password reset, login, and registration.

These configurations are set up in the `security.config.js` file, and they apply to all routes and endpoints in the application.


## 🔑 Authentication and Authorization

This project uses Passport.js and JSON Web Tokens (JWT) for both authentication and authorization.

### Authentication

Authentication is the process of verifying who a user is. In this project, we're using the Passport.js 'local' strategy for login. The 'local' strategy authenticates users using an email and password. When a user tries to log in, Passport.js will take the email and password from the request, and pass them to a verify callback. The verify callback will then check if a user with the given email and password exists in the database.

### Session Management

We're using JWT for session management. When a user logs in, a JWT is created and sent to the user. The JWT contains a payload, which is a set of data that includes information about the user. The JWT is signed with a secret key, which ensures that the token hasn't been tampered with.

### Authorization

Authorization is the process of verifying what a user has access to. After a user is authenticated, each subsequent request must include the JWT in the 'Authorization' header. Passport.js will then use the 'jwt' strategy to verify the token. If the token is valid, the request is authenticated and the route handler is executed. If the token is not valid, the request is not authenticated and an error is returned. This process ensures that users can only access the resources they are allowed to.

### Tools

* [![NodeJS.org][NodeJS.org]][NodeJS-url]
* [![ExpressJS.com][ExpressJS.com]][ExpressJS-url]
* [![Docker.com][Docker.com]][Docker-url]
* [![JWT.io][JWT.io]][JWT-url]
* [![PassportJS.com][PassportJS.com]][PassportJS-url]
* [![MongooseJS.com][MongooseJS.com]][MongooseJS-url]

### Contributors



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

[MongooseJS.com]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white (MongooseJS.com)
[MongooseJS-url]: https://mongoosejs.com/ (MongooseJS.com)