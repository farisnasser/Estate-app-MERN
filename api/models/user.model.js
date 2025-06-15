import mongoose from "mongoose";

//These are the rules for the database
// The user schema defines the structure of the user documents in the MongoDB collection
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true, // Ensures that each username is unique in the collection
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    avatar:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        
    },
    password:{
        type:String,
        required: true,
    }}
    , {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
}   );

const User = mongoose.model("User", userSchema); // Creates a model named "User" based on the userSchema        
// This model will be used to interact with the "users" collection in the MongoDB database
export default User; // Exports the User model for use in other parts of the application