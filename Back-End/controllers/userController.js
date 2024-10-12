const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const Post = require("./../models/Post");

require("dotenv").config();

// ----------------------------registerUser-----------------------------------------

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res
      .status(201)
      .json({ message: "User registered successfully (First Method)!" });
  } catch (error) {
    res
      .status(500)
      .send("Error registering user (First Method): " + error.message);
  }
};

// ----------------------------loginUser-----------------------------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", loggedIn: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({
      loggedIn: true,
    });
  } catch (error) {
    res.status(500).send({ loggedIn: false });
  }
};
// ----------------------------getUserData-----------------------------------------
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ loggedIn: false, user: null });
    }

    const posts = await Post.find({ author: req.user.id });

    res.status(200).json({
      loggedIn: true,
      user: user,
      posts: posts,  
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ loggedIn: false, user: null });
  }
};

