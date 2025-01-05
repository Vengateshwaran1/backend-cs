import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import reportRoutes from './Routes/reportRoutes.js';
import cors from 'cors';




dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/reports', reportRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
    connectDB();
});