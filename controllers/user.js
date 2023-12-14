import { application } from "express";
import bcrypt from "bcrypt"
import User from "../model/user.js";
import  Jwt  from "jsonwebtoken";


export const registerUser = async(req, res)=>{
    const {tel , email, password,user_role, education} = req.body
    if(!tel || !email || !password){
        res.status(400)
        throw new Error(`All Fields Mandatory`)
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
      res.status(400)
        throw new Error(`Applicant Already Registered`)
    }
   
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = await User.create({
        password: hashedPassword,
        tel,
        email,
        user_role,
        education
    })
    console.log(`User created: ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    } else{
       res.status(400)
        throw new Error(`User Data Not Valid`)
    }
    
}
//Get single User by ID
export const getUser = async(req ,res)=>{
    const userId = req.params.id
    try {
     const user =    await User.findById(userId)
     res.status(200).json(user)
    } catch (error) {
        
    }
}

//Get jobseekers page
export const getJobseekers = async (req, res) =>{
  res.sendFile('/forms.html', {root: "./public"});
}

//post initial user info
export const initialApplicantInfo = async (req, res) => {
  try {
    const { f_names, tel, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      return res.status(400).json({ error: 'Applicant already registered' });
    }

    const initialApplicantData = await User.create({
      f_names,
      tel,
      email,
    });

    console.log(initialApplicantData);

    // Respond with the necessary CORS headers
    res.header('Access-Control-Allow-Origin', 'https://localhost');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    return res.status(201).json({ message: 'Initial user (applicant) info created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



//Get all companies


export const getCompanies = async (req, res) => {
    try {
        const companies = await User.find({ user_role: 'company' }, { password: 0 });

        // Log the users to the console for debugging purposes
        console.log(companies);
        res.status(200).json(companies);       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all applicants
export const getApplicants = async (req, res)=>{
  try {
    const applicants =  await User.find({user_role: "odinary"}, {password: 0})
    // Log the users to the console for debugging purposes
    console.log(applicants);
  } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
  }
}
//Get All Users
export const getUsers =async (req, res)=>{
 const users =  await User.find({}, {password:0})
res.status(200).json({users})
console.log(users)
}


//Update user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the applicantId from the request parameters
    let updateFields = { ...req.body }; // Initialize with other fields from req.body

    // Check if a file is included in the request
    if (req.file) {
      // If a file is included, add it to the updateFields
      updateFields.file = req.file.buffer;
    }

    // Use the Mongoose findByIdAndUpdate method to update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedUser) {
      // If the user with the given ID is not found, return an error
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a success response with the updated applicant
    res.status(200).json(updateUser);
  } catch (error) {
    // Handle errors, e.g., database errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Private
export const getPrivateInfo = (req, res)=>{
  res.status(200).json("protected info")
}
  
  //Delete applicant by ID
  export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log('userId:', userId); // Add this line for debugging
    
      try {
        const deletedUser = await User.findByIdAndRemove(userId);
        
        if (!deletedUser) {
          console.log(`User with _id ${userId} not found`);
          return res.status(404).json({ message: 'User not found' });
        }
    
        console.log(`Document with _id ${userId} has been successfully deleted`);
        return res.status(204).json(); // Send a success response with no content
      } catch (error) {
        console.error('Error while removing User:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    //Delete all users
    export const deleteUsers = async (req, res) => {
      try {
        await User.deleteMany();
        return res.status(200).json({ message: 'All Users deleted successfully' });
      } catch (error) {
        console.error('Error while removing Users:', error);
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
      const user = await User.findOne({tel})
      //Then compare password with hashedPassword
      if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = Jwt.sign({
          user:{
            tel:user.tel,
            email:user.email,
            id:user.id
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

