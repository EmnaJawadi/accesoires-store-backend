const User = require("../Models/Users");
const {
  registerValidator,
  loginValidator,
} = require("../utilities/validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const validationResult = registerValidator.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.json(validationResult.error);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ error: "An account with this email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json({
      message: "Account successfully created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationResult = loginValidator.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.json(validationResult.error);
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ error: "Wrong email and/or password" });
    }
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong email and/or password" });
    }
    userExist.password = undefined;
    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: `Welcome ${userExist.firstName}`,
      userExist,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getUsers, registerUser, loginUser };