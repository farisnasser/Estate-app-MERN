import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup =  async (req, res) => {

    const {username,email,password} = req.body;//destructure the request body to use the values in the code
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword}); //using the User model from the DB to create a new user      
    await newUser.save(); //since we used await, we use async in the function
try {
    

    res.status(201).json("User created successfully");
} catch (error) {
    res.status(500).json({error: error.message});
}
   

}
