import { Router } from "express";
import { addProduct, findProductById, findAllProducts, updateProduct, removeProduct } from "../models/dbHelper.js";

const router = Router();

router.route("/").get(findAllProducts).post(addProduct);

router.route("/:id").get(findProductById).put(updateProduct).delete(removeProduct);

export default router;