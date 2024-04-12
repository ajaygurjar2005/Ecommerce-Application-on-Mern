import express from "express";
import {
  registerController,
  loginUser,
  forgotPasswordController,
  testController,
  updateUserController,
  getAllUsers
} from "../controller/registerController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.post("/register", registerController);
Router.post("/login", loginUser);
Router.post("/forgot-password",forgotPasswordController)

Router.get("/test", requireSignIn, isAdmin, testController);

//user Route 
Router.get("/user-auth",requireSignIn, (req,res)=>{
  res.status(200).send({ok:true})
})

// Admin Route
Router.get("/admin-auth",requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ok:true})
})

Router.get("/get-users",requireSignIn,isAdmin,getAllUsers)

Router.put("/profile",requireSignIn,updateUserController)

export default Router;
