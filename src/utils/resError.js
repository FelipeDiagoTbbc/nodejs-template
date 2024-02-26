const resError = (res, statusCode, message) => {
	res.status(statusCode).json({
		error: true,
		message,
	});
};

module.exports = resError;