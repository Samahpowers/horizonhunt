import Company from "../model/company.js";

const uploadCompanyFormhandler = async (req, res) => {
  try {
    const { name, tel, email, location, address, jobTittle } = req.body;

    // Validate if required fields are present
    if (!name || !tel || !email) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Handle file upload if a file is attached
    let fileData;
    if (req.file) {
      try {
        fileData = req.file.buffer; // Assuming fileData should be a Buffer
      } catch (fileError) {
        console.error("Error processing file:", fileError);
        return res.status(400).json({ error: "Invalid file format or size" });
      }
    }

    // Construct the company object with optional fields
    const companyData = {
      name,
      tel,
      email,
      location,
      address,
      jobTittle,
      file: fileData, // Attach file data if available
    };

    // Create a new Company instance and save to the database
    const company = new Company(companyData);
    const savedCompany = await company.save();

    console.log("Upload successful", savedCompany);

    // Respond with success and the saved company data
    res.status(201).json({ savedCompany });
  } catch (error) {
    console.error("Error uploading company data:", error);

    // Respond with a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { uploadCompanyFormhandler };
