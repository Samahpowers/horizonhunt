import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    f_names: String,
    tel: {
        type: String,
        unique: [true, `Phone number provided is already registered`],
        index: true,
    },
    email: {
        type: String,
        unique: [true, `Email provided is already registered`],
        index: true,
    },
    password: String,
    education: String,
    availability: Boolean,
    location: String,
    job_category: String,
    file: [Buffer], // Assuming you want to store multiple files, otherwise use Buffer directly
    user_role: {
        type: String,
        enum: ['ordinary', 'admin', 'company'], // Define possible roles
        default: 'ordinary', // Set a default role if not provided
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
