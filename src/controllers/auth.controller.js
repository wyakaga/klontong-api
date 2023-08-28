const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, BlacklistToken } = require("../models");
const { response } = require("../utils/response");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response(401, "Invalid email or password", "", res);
      }

      const isPwdValid = bcrypt.compareSync(password, user.password);

      if (!isPwdValid) {
        return response(401, "Invalid email or password", "", res);
      }

      const payload = { userId: user.id, userRole: user.role };
      const jwtSecret = process.env.JWT_SECRET;
      const jwtOptions = { expiresIn: "1d" };

      jwt.sign(payload, jwtSecret, jwtOptions, async (error, token) => {
        if (error) throw error;
        response(200, "Successfully signed in", { token, role: user.role }, res);
      })
    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return response(403, "Invalid email address", "", res);
      }

      if (password.length <= 6) {
        return response(403, "Password is at least have 6 characters", "", res);
      }

      await User.create({ email, password: bcrypt.hashSync(password, 10), role: role || "customer" });
      response(201, "Successfully registered", { email, role: role || "customer" }, res);
    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.header('Authorization').split(' ')[1];
      await BlacklistToken.create({ token });
      response(200, "Successfully logged out", "", res);
    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
}