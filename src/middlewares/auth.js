const jwt = require("jsonwebtoken");

const { BlacklistToken } = require("../models");
const { response } = require("../utils/response");

module.exports = {
	isSignedIn: async (req, res, next) => {
		const bearerToken = req.header("Authorization");

		if (!bearerToken) {
			return response(403, "Access denied", "", res);
		}

		const token = bearerToken.split(" ")[1];

		if (!token) {
			return response(403, "Access denied", "", res);
		}

		const isTokenInvalid = await BlacklistToken.findOne({ where: { token } });

		if (isTokenInvalid) {
			return response(403, "Invalid token", "", res);
		}

		jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
			if (error && error.name) {
				return response(403, error.message, "", res);
			}

			if (error) {
				return response(500, "Internal Server Error", { err: error.message }, res);
			}

			req.authInfo = payload;
			next();
		});
	},
	checkRole: async (req, res, next) => {
		const bearerToken = req.header("Authorization");

		if (!bearerToken) {
			return response(403, "Access denied", "", res);
		}

		const token = bearerToken.split(" ")[1];
		const isTokenInvalid = await BlacklistToken.findOne({ where: { token } });

		if (isTokenInvalid) {
			return response(403, "Invalid token", "", res);
		}

		jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
			if (error && error.name) {
				return response(403, error.message, "", res);
			}

			if (error) {
				return response(500, "Internal Server Error", { err: error.message }, res);
			}

			if (payload.userRole === "customer") {
				return response(403, "Unauthorized", "", res);
			}

			req.authInfo = payload.userRole;
			next();
		});
	},
};
