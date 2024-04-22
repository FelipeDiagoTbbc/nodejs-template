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


**Server:** Node, Express

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

### 🛡️ Dependency Security

Developers can use `npm audit` to check for known security issues in the project's dependencies.

For more detailed and continuous security monitoring, this project also includes `Snyk`. `Snyk` provides additional features such as automated fixes and vulnerability alerts. Developers are encouraged to use `Snyk` alongside `npm audit` for comprehensive security coverage of the project's dependencies.

- **npm audit:** This is a built-in command in the npm CLI that automatically checks for security issues in your project dependencies. It reviews the package dependency tree and produces a report of packages that have known security vulnerabilities.

- **Snyk:** This is a third-party tool that helps to find and fix known vulnerabilities in your dependencies. It provides a more comprehensive solution than `npm audit` by offering continuous monitoring and automated fixes.

To run an audit with npm, you can use the command `npm audit`. If you have Snyk installed, you can test your project with the command `snyk test`, and monitor your project continuously with `snyk monitor`.

### 🔒 Security Configurations

This project uses several security configurations to ensure the safety and reliability of the application:

1. **Helmet:** This is a middleware for Express.js that sets many HTTP headers to secure the application. It's being used for two main purposes:
  - **Content Security Policy (CSP):** Helmet is used to configure the CSP for the application. CSP is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. The directives defined in the CSP configuration specify the sources from which the application can load resources such as images, scripts, styles, fonts, etc. Notably, the `X-Frame-Options` header is now deprecated in favor of `frame-src` and `child-src` directives in the CSP.
  - **Security Headers:** Helmet sets a number of security headers. This includes setting the `X-Content-Type-Options`, `X-DNS-Prefetch-Control`, `X-Download-Options`, `X-Permitted-Cross-Domain-Policies`, `Referrer-Policy`, and `Expect-CT` headers.

3. **Cross-Origin Resource Sharing (CORS):** The application is configured to handle CORS, allowing or restricting requests from different origins based on the specified configuration. This is done using the `cors` middleware in Express.js.

4. **Validation** The application uses the `Joi` library for input validation. This is used to validate the request body, query parameters, and URL parameters.

5. **Error Handling:** The application uses a custom error handling middleware to handle errors. This middleware is used to catch errors and send an appropriate response to the client. It also logs the error to the console.

6. **Rate Limiting:** The application uses the `express-rate-limit` middleware to limit repeated requests to public APIs and/or endpoints such as password reset, login, and registration.

7. **Cross-Site Request Forgery (CSRF):** The application uses the `csurf` middleware to protect against CSRF attacks. This middleware adds a CSRF token to the request object, which is then used to validate the request. It's important to note that when using CSRF protection, the CSRF token header must also be allowed in CORS configuration. You can find more information about CSRF [here](https://www.scaler.com/topics/expressjs-tutorial/protecting-against-csrf-attacks-in-express/).

These configurations are set up in the `security.config.js` file, and they apply to all routes and endpoints in the application.


### CORS Configuration

This project uses Cross-Origin Resource Sharing (CORS) to control which domains are allowed to access the API. Here's a breakdown of the CORS configuration:

- `origin: '*'`: This allows requests from any origin (domain, protocol, or port). 

- `allowedHeaders`: This is a list of HTTP headers that the server will allow the client to use. Here, it's allowing headers like `Origin`, `Accept`, `Content-Type`, `X-Api-Version`, `X-CSRF-Token`, `Authorization`, and others. Notably, `X-CSRF-Token` is used for CSRF protection, and `Authorization` is typically used for sending JWTs or other types of authorization tokens.

- `methods: '*'`: This allows any HTTP method (GET, POST, PUT, DELETE, etc.).

- `exposedHeaders`: This is a list of headers that are safe to expose to the API of a CORS API specification. Here, it's exposing headers like `X-Api-Version`, `X-Request-Id`, and `X-Response-Time`.

- `maxAge: 1000`: This specifies the number of seconds that the preflight request can be cached. This can reduce the number of preflight requests made by the client, improving performance for certain types of requests.

This configuration is passed to the `cors` middleware, which is then used by the Express application. This means that these CORS settings will apply to all routes and endpoints in the application.


### Helmet Configuration

This project uses the `helmet` middleware to set up the Content Security Policy (CSP) and other security headers for the Express.js application. Here's a breakdown of the Helmet configuration:

- `app.use(helmet())`: This line sets up a variety of security headers to secure your Express.js application. By default, it enables 11 middleware functions that set various HTTP headers.

- `app.use(helmet.frameguard({ action: 'sameorigin' }))`: This line sets the `X-Frame-Options` header to `SAMEORIGIN`, which means the page can only be displayed in a frame on the same origin as the page itself. The `X-Frame-Options` header is used to indicate whether a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>`, or `<object>`. Note that `X-Frame-Options` is now deprecated in favor of `frame-src` and `child-src` directives in the CSP.

- `app.use(helmet({...}))`: This line sets up the Content Security Policy (CSP) for your application. The CSP is a security layer that helps detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. The directives defined in the CSP configuration specify the sources from which the application can load resources.

  - `default-src`: This is the default policy for fetching resources such as JavaScript, Images, CSS, Font's, AJAX requests, Frames, HTML5 Media. Here, it's set to `'none'`, which means by default, no content will be loaded unless specified by other more specific directives.

  - `img-src`: This directive specifies valid sources of images. Here, it's allowing images from the same origin (`'self'`), from data URLs (`data:`), and from a variety of specific domains.

  - `script-src`: This directive specifies valid sources for JavaScript. It's allowing scripts from the same origin (`'self'`) and from a variety of specific domains.

  - `style-src`: This directive specifies valid sources for stylesheets. It's allowing stylesheets from the same origin (`'self'`) and from a variety of specific domains.

  - `object-src`: This directive specifies valid sources for the `<object>`, `<embed>`, and `<applet>` elements. Here, it's set to `'none'`, which means these elements will not load content from any source.

  - `manifest-src`: This directive specifies which manifest files can be applied to the resource. Here, it's set to `'self'`, which means only manifest files from the same origin can be applied.

  - `font-src`: This directive specifies valid sources for fonts loaded using `@font-face`. Here, it's allowing fonts from the same origin (`'self'`), from data URLs (`data:`), and from a variety of specific domains.

  - `connect-src`: This directive controls resources the page can connect to via script interfaces (like Fetch API, XMLHttpRequest, WebSocket, and EventSource). Here, it's allowing connections to a variety of specific domains.

  - `frame-src`: This directive specifies valid sources for nested browsing contexts loading using elements such as `<frame>` and `<iframe>`. Here, it's allowing frames from a variety of specific domains.

Just remember that the CSP is a powerful tool for reducing or eliminating the vectors for cross-site scripting attacks, but it can be complex to set up correctly and may require careful testing.


### Anti-CSRF TokensSecure Express.js Sessions and Cookies

Anti-CSRF tokens are unique and random values that are generated on the server-side and attached to each user’s session. These tokens are then included in the request body, URL, or headers, and are validated on the server-side to ensure that the request is legitimate.

This project uses the `csurf` middleware to protect against Cross-Site Request Forgery (CSRF) attacks. Here's a breakdown of how it's set up:

- `app.use(csurf())`: This line sets up the `csurf` middleware for the Express.js application. This middleware adds a CSRF token to the request object, which is then used to validate the request. The CSRF token is added to the request object as `req.csrfToken()`.

- `app.use((req, res, next) => {...})`: This middleware function is used to set the CSRF token in a cookie. The CSRF token is then sent to the client in the cookie, and the client must send the token back in the request. This is done to validate the request and protect against CSRF attacks.

- `app.use((err, req, res, next) => {...})`: This middleware function is used to handle CSRF errors. If the CSRF token is missing or invalid, this middleware will catch the error and send an appropriate response to the client.

- `app.use((req, res, next) => {...})`: This middleware function is used to set the CSRF token in the response headers. This is done to ensure that the CSRF token is sent to the client in the response headers.

It's important to note that when using CSRF protection, the CSRF token header must also be allowed in CORS configuration. This is done by adding the `X-CSRF-Token` header to the list of allowed headers in the CORS configuration.


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