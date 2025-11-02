import express from "express";
import { adminLogin, googleLogin, Login, Logout, register } from "../controller/authController.js";

const authRoute = express.Router()

authRoute.post('/reg',register)

authRoute.post('/login',Login)

authRoute.get('/logout',Logout)

authRoute.post('/googleLogin',googleLogin)

authRoute.post('/adminLogin',adminLogin)

export default authRoute