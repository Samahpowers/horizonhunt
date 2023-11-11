import mongoose, { model } from "mongoose";
const {Schema} = mongoose
const ApplicantSchema = new Schema ({
    f_names: String,
    tel: {
        type: String,
        unique:[true, `Phone number Provided Registered already`],
        index:true
    },
    email: {
        type: String,
        unique:[true, `Email Provided Registered already`],
        index: true
    },
    password:String,
    education: String,
    availability:Boolean,    
    file: [Buffer, `upload CV Here`],
    
   

},{timestamps: true})


export default mongoose.model("Applicant",ApplicantSchema)