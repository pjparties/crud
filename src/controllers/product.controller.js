import knex from "knex";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import config from "../../knexfile.js";

const db = knex(config.development);

const findAllProducts = asyncHandler(async (_req, res) => {
  const products = await db("products");
  if (!products) {
    return res.status(404).json(new ApiError(404, null, "No products found"));
  }
  console.log(products);
  return res.json(
    new ApiResponse(201, products, "successful in finding all products")
  );
});

const findProductById = asyncHandler(async (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).json(new ApiError(400, null, "Please provide id"));
  }
  const productFound = await db("products")
    .where({ id: req.params.id })
    .first();
  if (!productFound) {
    return res.status(404).json(new ApiError(404, null, "No product found"));
  }
  return res.json(
    new ApiResponse(201, productFound, "successful in finding the product")
  );
});

const findProductByName = asyncHandler(async (req, res) => {
  const { product_name } = req.params;
  // TODO: test case to check if product_name is undefined ie params is empty
  if (req.params === null || req.params === undefined) {
    return res
      .status(400)
      .json(new ApiError(400, null, "Please provide product_name"));
  }

  const productFound = await db("products").where({ product_name }).first();
  if (!productFound) {
    return res.status(404).json(new ApiError(404, null, "No product found"));
  }

  return res.json(
    new ApiResponse(200, productFound, "Successfully found the product")
  );
});

const addProduct = asyncHandler(async (req, res) => {
  const { product_name, description, price, quantity } = req.body;
  if (!product_name || !description || !price || !quantity) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          null,
          "Please provide product_name, description, price, quantity"
        )
      );
  }
  // if product alr exists
  const checkForProduct = await db("products")
    .where({ product_name: product_name })
    .first();

  if (checkForProduct) {
    return res
      .status(400)
      .json(new ApiError(400, null, "Product already exists"));
  }
  const id = await db("products").insert(req.body);
  if (!id) {
    return res
      .status(500)
      .json(new ApiError(500, null, "Server Error while inserting record"));
  }
  return res.json(new ApiResponse(200, id, "added new product"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { product_name, description, price, quantity } = req.body;
  if (!product_name || !(description || price || quantity)) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          null,
          "Please provide a product_name and atleast one from (description, price, quantity)"
        )
      );
  }

  const productFound = await db("products").where({ product_name }).first();
  if (!productFound) {
    return res.status(404).json(new ApiError(404, null, "No product found"));
  }

  const count = await db("products").where({ product_name }).update(req.body);
  if (!count) {
    return res
      .status(500)
      .json(new ApiError(500, null, "Server Error while updating record"));
  }

  return res.json(new ApiResponse(200, count, "Product updated successfully"));
});

const removeProduct = asyncHandler(async (req, res) => {
  const { product_name } = req.body;
  if (!product_name) {
    return res
      .status(400)
      .json(new ApiError(400, null, "Please provide a product_name"));
  }

  const productFound = await db("products").where({ product_name }).first();
  if (!productFound) {
    return res.status(404).json(new ApiError(404, null, "No product found"));
  }

  const count = await db("products").where({ product_name }).del();
  if (!count) {
    return res
      .status(500)
      .json(new ApiError(500, null, "Server Error while deleting record"));
  }

  return res.json(new ApiResponse(200, count, "Product deleted successfully"));
});

export {
  findAllProducts,
  findProductById,
  findProductByName,
  addProduct,
  updateProduct,
  removeProduct,
};
