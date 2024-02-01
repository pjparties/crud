import knex from "knex";

import config from '../knexfile.js';


const db = knex(config.development);

async function addProduct(product) {
  const id = await db("products").insert(product);
}

function findProductById(id) {
  return db("products").where({ id }).first();
}

function findAllProducts() {
  return db("products");
}

function updateProduct(id, changes) {
  return db("products").where({ id }).update(changes);
}

function removeProduct(id) {
  return db("products").where({ id }).del();
}

export default {
  addProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  removeProduct
};

