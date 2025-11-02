import jwt from 'jsonwebtoken'
const isAuth = async (req,res,next)=>{

    try {
        let {token} = req.cookies

        if(!token){
            res.status(400).json({message:"User Does not have Token"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!verifyToken){
            res.status(400).json({message:"User Does not have valid token"})
        }

        req.userId = verifyToken.userId

        next()


    } catch (error) {
        console.log(error);
      res.status(400).json({message:"token error"})
    }

}

export default isAuth