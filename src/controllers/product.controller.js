const { Op } = require("sequelize");

const { Product, Category } = require("../models");
const { response } = require("../utils/response");
const { uploader } = require("../utils/cloudinary");
const { generateSku } = require("../utils/generateSku");

module.exports = {
  getAll: async (req, res) => {
    try {
      let order = ["id", "ASC"];

      if (req.query.order === "cheapest") {
        order = ["price", "ASC"];
      }

      if (req.query.order === "priciest") {
        order = ["price", "DESC"];
      }

      const search = req.query.search || "";
      const groupBy = req.query.groupBy || "";
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const { count, rows } = await Product.findAndCountAll({
        attributes: ["id", "name", "price", "image"],
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        include: {
          model: Category,
          attributes: ["name"],
          where: {
            name: {
              [Op.iLike]: `%${groupBy}%`,
            }
          }
        },
        order: [order],
        offset,
        limit,
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const previousPage = page > 1 ? page - 1 : null;

      const paginationMeta = {
        totalItems: count,
        totalPages,
        currentPage: page,
        nextPage: nextPage ? `${req.protocol}://${req.headers.host}?page=${nextPage}` : null,
        previousPage: previousPage ? `${req.protocol}://${req.headers.host}?page=${previousPage}` : null,
      }

      response(200, "OK", { products: rows, meta: paginationMeta }, res);
    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
  getDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Category,
          attributes: ["name"]
        }
      });

      if (!product) {
        return response(404, "Product not found", "", res);
      }

      response(200, "OK", product, res);

    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
  addProduct: async (req, res) => {
    try {
      const { file } = req;

      const { categoryId, name, description, weight, width, length, height, price } = req.body;

      const nextId = await Product.max('id', { raw: true }) + 1;

      const { data, error, message } = await uploader(req, "product", nextId);

      if (error) throw { message, error };
      if (!file) return response(400, "Image is required", "", res);

      const fileLink = data.secure_url;
      const result = await Product.create({
        categoryId,
        sku: generateSku(8),
        name,
        description,
        weight,
        width,
        length,
        height,
        image: fileLink,
        price,
      });

      if (result) {
        response(201, "Succesfully created", result, res);
      }

    } catch (error) {
      console.log(error);
      return response(500, "Internal Server Error", { err: error.message }, res);
    }
  },
}