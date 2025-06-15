import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return next(errorHandler(400, "All fields are required"));
        }
        
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        
        res.status(201).json("User created successfully");
    } catch (error) {
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(errorHandler(400, `${field} already exists`));
        }
        next(error);
    }
};

export const signin = async (req,res,next) => {

    const {email,password} = req.body;


    try {
        const validUser = await User.findOne({email}); //this function finds the user in the DB and returns the user object
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password); //this function compares the password in the request body with the password in the DB
        if (!validPassword) return next(errorHandler(400, "Wrong credentials")); 

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET); //_id is a variable from mongoDB and JWT_SECRET is a variable from the .env file
        //this function signs the token with the user's ID and the JWT_SECRET
        
        // Remove password from response for security
        const {password: pass, ...rest} = validUser._doc;
        
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);



    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next) => {
    try {

        const user = await User.findOne({email: req.body.email}); //this function finds the user in the DB and returns the user object
        if (user) {//if the user exists in the DB, we will return the user object
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc; //seperates the password from the user object
            res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);
        }   
        else { //otherwise, we have to create a new password for the user since our user model has password as a required field
            const generatedPassword = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).substring(2,15) , email: req.body.email, password: hashedPassword, avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);
        }

        
    } catch (error) {
        next(error);
    }
}
