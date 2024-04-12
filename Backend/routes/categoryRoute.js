import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController
} from "../controller/categoryController.js";

const Router = express.Router();

Router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

Router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

Router.get('/get-category',categoryController)
Router.get('/single-category/:slug',singleCategoryController)

Router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default Router;
