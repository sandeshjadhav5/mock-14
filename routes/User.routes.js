const express = require("express");

const { UserModel } = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// R E G I S T E R   U S E R
userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          email,
          password: hashedPassword,
        });

        await user.save();
        res.send("Successfully Registered");
      }
    });
  } catch (err) {
    res.send("Registration Failed");
    console.log(err);
  }
});

//L O G I N     U S E R
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hashedPassword = user[0].password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai", {
            expiresIn: "2h",
          });
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send("Invalid Credentials");
        }
      });
    }
  } catch (err) {
    res.send("Failed to Login");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
