/**
 * Factory function to create custom error classes.
 *
 * @param {string} name - The name of the custom error class.
 * @returns {CustomizedError} - The custom error class.
 */
const createErrorFactory = (name) => {
  return class CustomizedError extends Error {
    constructor(message, status) {
      super(message);
      this.name = name;
      this.status = status;
    }
  }
};

/**
 * @class ClientError - Custom error for client errors
 * @extends Error
 * @param {string} message
 * @param {number} status
 * @description This class is used to create a custom error for client errors
 * @example throw ClientError("Custom client error message", 401);
 */
const ClientError = createErrorFactory("ClientError");

/**
 * @class AuthClientError - Custom error for client authentication errors
 * @extends Error
 * @param {string} message
 * @param {number} status
 * @description This class is used to create a custom error for client authentication errors
 * @example throw AuthClientError("Custom client authentication error message", 401);
 */
const AuthClientError =  createErrorFactory("AuthClientError");

/**
 * @class ConnectionError - Custom error for connection errors
 * @extends Error
 * @param {string} message
 * @param {number} status
 * @description This class is used to create a custom error for connection errors, such as database connection errors
 * @example throw ConnectionError("Custom connection error message", 500);
 */
const ConnectionError =  createErrorFactory("ConnectionError");

module.exports = { ClientError, AuthClientError, ConnectionError };


// http status codes
// 100: Informational
// 200: Success
// 300: Redirection
// 400: Client Error
// 500: Server Error
