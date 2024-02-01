import knex from "knex";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import config from '../knexfile.js';

const db = knex(config.development);

const addProduct = asyncHandler(async (req, res) => {
  const id = await db("products").insert(req.body);
  res.json(new ApiResponse(200, "success", id));
});

const findProductById = asyncHandler(async (req, res) => {
  const product = await db("products").where({ id: req.params.id }).first();
  res.json(new ApiResponse(200, "success", product));
});

const findAllProducts = asyncHandler(async (req, res) => {
  const products = await db("products");
  res.json(new ApiResponse(200, "success", products));
});

const updateProduct = asyncHandler(async (req, res) => {
  const count = await db("products").where({ id: req.params.id }).update(req.body);
  res.json(new ApiResponse(200, "success", count));
}); 

const removeProduct = asyncHandler(async (req, res) => {
  const count = await db("products").where({ id: req.params.id }).del();
  res.json(new ApiResponse(200, "success", count));
});


export {
  addProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  removeProduct
};

