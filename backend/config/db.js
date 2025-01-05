import mongoose from "mongoose"

export const connectDB=async ()=>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO DB Connected :${conn.connection.host} `)
    }catch(error){
        console.log(`MONGO DB Connection Error:${error} `);
        process.exit(1) // 1 Means exit with failure, 0 means successs

    }
}