import User from "../model/UserModel.js"

export const getCurrentUser = async(req,res)=>{
    try {
        let user = await User.findById(req.userId).select('-password')

        if(!user){
          return  res.status(404).json({message:'User Not Found'})
        }

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
           return  res.status(404).json({message:'Auth Error'})
        
    }
}


export const getAdmin = async (req,res)=>{
    try {
        let email = req.email;

        if(!email){
            res.status(404).json({message:"Admin Not Found"})
        }
        else{
            return res.status(201).json({email:email,role:'admin'})
        }
  
    } catch (error) {
        console.log(error);
        
    }
}