const express = require("express");
const bcrypt = require("bcrypt");
const {
  UserModel,
  validateUser,
  validateLogin,
  createToken,
} = require("../models/userModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await UserModel.find({});
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/myInfo", auth, async (req, res) => {
  try {
    const data = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err: "Token Invalide or Expired" });
  }
});

// add user
router.post("/", async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = new UserModel(req.body);
    // crypt the password using "bcrypt" , crypt power: 10
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // returning to the client side the password as * so the hacker wouldnt know which crypt we using
    user.password = "******";
    res.status(201).json(user);
  } catch (err) {
    // check if the email is already in the system
    if (err.code == 11000) {
      return res
        .status(400)
        .json({ err: "Email already in system", code: 11000 });
    }
    console.log(err);
    res.status(502).json({ err });
  }
});

// check if the user is authenticated and if so login
router.post("/login", async (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // check if the user email is in the data base.
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ err: "Email not found" });
    }
    // check if the user passwors the same as the crypt password.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ err: "Password not match" });
    }
    // send token
    const token = createToken(user.id);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
