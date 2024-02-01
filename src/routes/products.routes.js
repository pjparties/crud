import { Router } from "express";
import {
  addProduct,
  findProductById,
  findProductByName,
  findAllProducts,
  updateProduct,
  removeProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(findAllProducts).post(addProduct);

router
  .route("/:id")
  .get(findProductById)
  .put(updateProduct)
  .delete(removeProduct);

router.route("/name/:product_name").get(findProductByName);

export default router;
