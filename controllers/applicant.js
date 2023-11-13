import { application } from "express";
import bcrypt from "bcrypt"
import Applicant from "../model/applicant.js";
import  Jwt  from "jsonwebtoken";


export const registerApplicant = async(req, res)=>{
    const {tel , email, password} = req.body
    if(!tel || !email || !password){
        res.status(400)
        throw new Error(`All Fields Mandatory`)
    }
    const applicantAvailable = await Applicant.findOne({email})
    if(applicantAvailable){
      res.status(400)
        throw new Error(`Applicant Already Registered`)
    }
   
    const hashedPassword = bcrypt.hashSync(password, 10)
    const applicant = await Applicant.create({
        password: hashedPassword,
        tel,
        email
    })
    console.log(`Applicant created: ${applicant}`)
    if(applicant){
        res.status(201).json({_id: applicant.id, email: applicant.email})
    } else{
       res.status(400)
        throw new Error(`Applicant Data Not Valid`)
    }
    
}
//Get single Applicant by ID
export const getApplicant = async(req ,res)=>{
    const applicantId = req.params.appId
    try {
     const applicant =    await Applicant.findById(applicantId)
     res.status(200).json(applicant)
    } catch (error) {
        
    }
}

//Get All Applicants
export const getAllapplicants =async (req, res)=>{
 const applicants =  await Applicant.find({}, {password:0})
res.status(200).json({applicants})
console.log(applicants)
}


//Update applicant
export const updateApplicant = async (req, res) => {
  try {
    const applicantId = req.params.appId; // Extract the applicantId from the request parameters
    let updateFields = { ...req.body }; // Initialize with other fields from req.body

    // Check if a file is included in the request
    if (req.file) {
      // If a file is included, add it to the updateFields
      updateFields.file = req.file.buffer;
    }

    // Use the Mongoose findByIdAndUpdate method to update the applicant
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicantId,
      updateFields,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedApplicant) {
      // If the applicant with the given ID is not found, return an error
      return res.status(404).json({ error: 'Applicant not found' });
    }

    // Send a success response with the updated applicant
    res.status(200).json(updatedApplicant);
  } catch (error) {
    // Handle errors, e.g., database errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
  //Delete applicant by ID
  export const deleteApplicant = async (req, res) => {
    const appId = req.params.appId;
    console.log('appId:', appId); // Add this line for debugging
    
      try {
        const deletedApplicant = await Applicant.findByIdAndRemove(appId);
        
        if (!deletedApplicant) {
          console.log(`Document with _id ${appId} not found`);
          return res.status(404).json({ message: 'Applicant not found' });
        }
    
        console.log(`Document with _id ${appId} has been successfully deleted`);
        return res.status(204).json(); // Send a success response with no content
      } catch (error) {
        console.error('Error while removing Applicant:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    //Delete all applicants
    export const deleteAllapplicants = async (req, res) => {
      try {
        await Applicant.deleteMany();
        return res.status(200).json({ message: 'All applicants deleted successfully' });
      } catch (error) {
        console.error('Error while removing Applicants:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
    

    // login Applicant
    export const login =async (req, res)=>{
      const {tel, password} = req.body
      if(!tel || !password){
        res.status(400)
        throw new Error(`Telephone number and Email Required`)
      }
      const applicant = await Applicant.findOne({tel})
      //Then compare password with hashedPassword
      if(applicant && (await bcrypt.compare(password, applicant.password))) {
        const accessToken = Jwt.sign({
          applicant:{
            tel:applicant.tel,
            email:applicant.email,
            id:applicant.id
          }          
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
        )

        res.status(200).json({accessToken})
      } else {
        res.status(401)
        throw new Error(`Phone number or Password Incorrect`)
      }
      
      
    }

    //Logout Applicant
    export const logout = async(req, res)=>{
      res.status(200).json({Messege: `Applicant logged out`})
    }

