import User from "../models/User.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during signup auth in backend" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found in backend" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Wrong Password while checking in backend" });
    }

    const token = jwt.sign({ id: existingUser._id, username: existingUser.username }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error while login auth in backend" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export { signup, login, logout };
