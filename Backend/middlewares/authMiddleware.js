import Jwt from "jsonwebtoken";
import users from "../Modal/userModal.js";

export const requireSignIn = async (req, res, next) => {
  try {

    console.log(req.headers.authorization,'authrization')
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    console.log(decode, "decode");
    next();
  } catch (err) {
    console.log("Error", err);
  }
};

//admin middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await users.findById(req.user._id);
    console.log(user,'user')
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        msg: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log("Error", err);
  }
};

export default { requireSignIn, isAdmin };
