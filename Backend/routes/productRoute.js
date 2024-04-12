import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productCountController,
  productListController,
  productFilterController,
  relatedProductController,
  
} from "../controller/productController.js";
import formidable from "express-formidable";


const Router = express.Router();

Router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

Router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

Router.get("/get-product", getProductController);
Router.get("/get-product/:slug", getSingleProductController);
Router.get("/product-photo/:pid", productPhotoController);
Router.delete("/product/:pid", deleteProductController);

Router.post("/product-filters",productFilterController);

Router.get("/product-count",productCountController)

Router.get("/product-list/:page",productListController)

Router.get("/related-product/:pid/:cid",relatedProductController)




export default Router;
