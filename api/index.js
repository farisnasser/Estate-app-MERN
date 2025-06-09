import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'; // Importing the user router
import authRouter from './routes/auth.routes.js';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {   
    console.error('Error connecting to MongoDB:', err);
});

const app = express();

// CORS middleware - Add this before other middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());//allows us to parse json data in the request body


app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err,req,res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({

        success: false,
        statusCode,
        message

    });
});
