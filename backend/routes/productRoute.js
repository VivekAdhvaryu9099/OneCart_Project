import express from "express";
import { AddProduct, ListProduct, RemoveProduct } from "../controller/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

let productRoute = express.Router();

productRoute.post(
  "/addPro",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AddProduct
);


productRoute.get('/ListProduct',ListProduct)

productRoute.post('/RemoveProduct/:id',adminAuth,RemoveProduct)


export default productRoute