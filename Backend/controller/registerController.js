import { hashPassword } from "../Helpers/authHelper.js";
import users from "../Modal/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//REGISTER USER
dotenv.config();
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ error: "plese fill all the details" });
    }

    const userEmail = await users.findOne({ email: email });

    if (userEmail) {
      return res.status(200).send({
        msg: "Already register",
        success: false,
      });
    }

    const hashedpassword = await hashPassword(password);

    const response = await new users({
      name,
      email,
      password: hashedpassword,
      phone,
      address,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      msg: "User Register successfully ",
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in Register User",
      err,
    });
  }
};

//LOGIN USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        msg: "Please fill all the details",
      });
    }

    const checkEmail = await users.findOne({ email });
    if (!checkEmail) {
      return res.status(200).json({
        msg: "Email id is not registered",
        success: false,
      });
    } else {
      const match = await bcrypt.compare(password, checkEmail.password);

      if (!match) {
        return res.status(200).json({
          msg: "Please fill correct password",
          success: false,
        });
      } else {
        const token = jwt.sign(
          { _id: checkEmail._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "20days",
          }
        );
        return res.status(200).json({
          success: true,
          msg: "Login successful",
          user: {
            name: checkEmail.name,
            email: checkEmail.email,
            address: checkEmail.address,
            phone: checkEmail.phone,
            role: checkEmail.role,
          },
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error in login",
      success: false,
      error: err.message, // Adjusted to capture error message
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(200).send({
        success: false,
        msg: "Please fill all the details",
      });
    }

    const user = await users.findOne({ email, answer });
    if (!user) {
      return res.status(200).send({
        msg: "Wrong Email or Answer",
        success: false,
      });
    }

    const hashedpassword = await hashPassword(newPassword);
    console.log(hashPassword, "has");
    await users.findByIdAndUpdate(user._id, { password: hashedpassword });

    res.status(200).send({
      success: true,
      msg: "Password Reset successfully",
    });
  } catch (err) {
    console.log(err, "err");
    res.status(500).send({
      success: false,
      msg: "Something went wrong",
      err,
    });
  }
};

export const testController = (req, res) => {
  res.status(200).send("protect Route");
};

export const updateUserController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await users.findById(req.user._id);

    if (password && password.length < 6) {
      res.json({ error: "Password is required and must be at least 6 characters long" });
  }

    const latestPassword = password ? await hashPassword(password) : undefined

    const updatedUser = await users.findByIdAndUpdate(req.user._id ,{
      name:name || user.name,
      password:latestPassword || user.password,
      phone:phone || user.phone,
      address:address || user.address
    },{new:true})

    res.status(200).send({
      success:true,
      msg:"User updated Successfully",
      updatedUser
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      msg: "Something went Wrong",
    });
  }
};

export const getAllUsers = async(req,res) => {
  try{
    const response = await users.find({})
    res.status(200).send({
      msg:"Find all Data Successfully",
      success:true,
      response,
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send({
      msg:"Error to find Users",
      success:false,
      err
    })
  }
}

export default { registerController, loginUser, testController ,getAllUsers};
