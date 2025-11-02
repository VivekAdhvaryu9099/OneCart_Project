import User from "../model/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { GenToken, GenTokenAdmin } from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Enter a valid email" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await GenToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "Lax", // Lax works for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: `SignUp Error: ${error.message}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = await GenToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: `Login Error: ${error.message}` });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "Lax", secure: false });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: `Logout Error: ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // password = uid from Firebase

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password });
    }

    const token = await GenToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Google login successful", user, token });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ message: `Google Login Error: ${error.message}` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (email === process.env.ADMIN_EMAIL && pass === process.env.ADMIN_PASS) {
      const token = await GenTokenAdmin(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({ message: "Admin login successful", token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
