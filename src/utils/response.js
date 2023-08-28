module.exports = {
	response: (statusCode, message, data, res) => {
		res.status(statusCode).json({
			statusCode,
			message,
			data: data || [],
		});
	},
};
