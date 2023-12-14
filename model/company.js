import mongoose, { model } from "mongoose";
const {Schema} = mongoose
const componyDataSchema = new Schema ({
    name: String,
    tel: {
        type: String,
        unique:true
    },
    email: {
        type: String,
        unique:true
    },
    location: String,
    jobTittle: String,
    address: String,
    file: Buffer
   

})


export default mongoose.model("company",componyDataSchema)