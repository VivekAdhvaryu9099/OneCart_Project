import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModal.js";

export const AddProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);
    let image4 = await uploadOnCloudinary(req.files.image4[0].path);

    let ProductData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

        const product = await Product.create(ProductData)

        return res.status(201).json({product})

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message:error})
    
  }
};



export const ListProduct = async (req,res)=>{
    try {
        const product = await Product.find({})
         return res.status(201).json({product})
    } catch (error) {
       console.log(error);
    
    return res.status(500).json({message:error})
    }
}



export const RemoveProduct = async (req,res)=>{
  try {
      let {id} = req.params;
      const product = await Product.findByIdAndDelete(id)
       return res.status(201).json({message:"Product Remove Succesfully"})
  } catch (error) {
      console.log(error);
    
    return res.status(500).json({message:error})
  }
}