import Company from "../model/company.js"

const uploadCompanyFormhandler =async (req, res) => {
  console.log(req.body)
  const {companyName, telephoneNumber, email} = req.body
  if(!companyName || !telephoneNumber || !email){
    res.status(400)
    throw new Error(`All fields required`)
  }

  res.status(201).json({ file: req.body });
  try {
    const  company = new Company( {
      companyName,
      telephoneNumber,
      email,
      file: req.file.buffer    
    })
     const savedCompany =   await company.save()
         console.log("Upload successful", savedCompany);
         
        
  } catch (error) {
     console.error("Error uploading file:", error);
    
  }
}

// Get Company Forms

export  {uploadCompanyFormhandler}