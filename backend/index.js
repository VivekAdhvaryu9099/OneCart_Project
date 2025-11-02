import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/AuthRoute.js";
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/CartRoute.js";
import orderRoutes from "./routes/OrderRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5174','http://localhost:5173','https://e-commerce-39fbe.firebaseapp.com'],
    credentials:true
}))




app.use('/api/auth',authRoute)

app.use('/api/user',userRoute)

app.use('/api/product',productRoute)

app.use('/api/cart',cartRoutes)

app.use('/api/order',orderRoutes)

app.listen(PORT, () => {
    console.log("Sucessfully Deploy")
    ConnectDb()
});
