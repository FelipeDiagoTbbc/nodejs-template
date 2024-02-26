const response = (res, status, message, data) => {
	res.status(status).json({
		error: false,
		message,
		data,
	});
};

module.exports = response;