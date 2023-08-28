'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const { generateSku } = require("../../utils/generateSku");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        email: "admin@mail.com",
        password: bcrypt.hashSync("admin123", 10),
        role: "admin",
      },
      {
        email: "user@mail.com",
        password: bcrypt.hashSync("user123", 10),
        role: "customer",
      }
    ];

    const categories = [
      {
        name: "snack"
      },
      {
        name: "beverage"
      },
      {
        name: "spice"
      },
      {
        name: "vegetable"
      }
    ]

    const products = Array.from({ length: 100 }).map(() => ({
      categoryId: Math.floor(Math.random() * categories.length) + 1,
      sku: generateSku(8),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      weight: faker.number.int({ min: 1, max: 10 }),
      width: faker.number.int({ min:1, max: 30 }),
      length: faker.number.int({ min: 1, max: 50 }),
      height: faker.number.int({ min: 1, max: 20 }),
      image: faker.image.urlLoremFlickr({ category: "products" }),
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 })
    }))

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
