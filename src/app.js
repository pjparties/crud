import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "50kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// define routes
// import
// app.use("/api/v1/<address>", <router>);
import Product from "./models/dbHelper.js";
import { ApiResponse } from "./utils/ApiResponse.js";

app.get("/api/v1/products", async (req, res) => {
  return res.json(new ApiResponse(200, null, "success"));
});

export default app;
