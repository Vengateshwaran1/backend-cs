import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected to', conn.connection.host);
    } catch (error) {
        console.log('MongoDB connection failed');
        console.log(error);
    }
}

export default connectDB;
