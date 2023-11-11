import mongoose, { model } from "mongoose";
const {Schema} = mongoose
const componyDataSchema = new Schema ({
    companyName: String,
    telephoneNumber: {
        type: String,
        unique:true
    },
    email: {
        type: String,
        unique:true
    },
    file: Buffer
   

})


export default mongoose.model("company",componyDataSchema)