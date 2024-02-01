import knex from "knex";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import config from "../../knexfile.js";

const db = knex(config.development);

const findAllProducts = asyncHandler(async (req, res) => {
  const products = await db("products");
  if (!products) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "No products found"));
  }
  console.log(products);
  return res.json(
    new ApiResponse(200, products, "Successfully found all products")
  );
});

const findProductById = asyncHandler(async (req, res) => {
  const product = await db("products").where({ id: req.params.id }).first();
  res.json(new ApiResponse(200, product, "successful in finding the product"));
});

const addProduct = asyncHandler(async (req, res) => {
  const { product_name, description, price, quantity } = req.body;
  if (!product_name || !description || !price || !quantity) {
    return res.status(400).json(
      new ApiResponse(
        400,
        null,
        "Please provide product_name, description, price, quantity"
      )
    );
  }
  const id = await db("products").insert(req.body);
  if (!id) {
    return res.status(500).json(new ApiResponse(500, null, "Server Error while inserting record"));
  }
  return res.json(new ApiResponse(200, id, "added new product"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const count = await db("products")
    .where({ id: req.params.id })
    .update(req.body);
  res.json(new ApiResponse(200, count, "updated successfully"));
});

const removeProduct = asyncHandler(async (req, res) => {
  const count = await db("products").where({ id: req.params.id }).del();
  res.json(new ApiResponse(200, count, "deleted product"));
});

export {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  removeProduct,
};
