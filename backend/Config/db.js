import mongoose from "mongoose";

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Failed to connect");
        
    }
}

export default ConnectDb