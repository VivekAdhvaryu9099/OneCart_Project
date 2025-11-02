import jwt from 'jsonwebtoken'

export const GenToken = async (userId)=>{
    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:'7d'}) 
        return token
    } catch (error) {
        console.log("Token Error");
                
    }
}



export const GenTokenAdmin = async (email)=>{
    try {
        let token = await jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:'1d'}) 
        return token
    } catch (error) {
        console.log("Token Error");
                
    }
}




