/**
 * @param {Function} fn - The async function for which errors should be caught.
 * @returns {Function} - A function that executes the input function and catches any errors.
 * @description This function is used to catch errors in async functions, and send them to the express error handler.
 */
const catchedAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

module.exports = catchedAsync;
