document.addEventListener("DOMContentLoaded", ()=>{
  const jobSeekerSection = document.querySelector('.job-seekers-section');
  const employerSection = document.querySelector('.job-employers-section');
  const job_Seekers_form = document.getElementById("job-seekers-form")
  const employers_form = document.getElementById("employers_form")

  const urlParams = new URLSearchParams(window.location.search);
  const buttonType = urlParams.get('buttonType');
  console.log(buttonType);

  if (buttonType === "jobseeker") {
   
    employerSection.style.display = "none";
  } else if (buttonType === "employer") { // Corrected the condition
    
    jobSeekerSection.style.display = "none";
  }

  job_Seekers_form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Get form values (Applicant)
    const f_names = document.getElementById("js_name").value;
    const email = document.getElementById("js_email").value;
    const tel = document.getElementById("js_tel").value;
  
    // Construct the URL for the POST request
    const url = "https://www.horizonhunt.co.ke/api/user/initial/applicantinfo";
  
    // Get user data
    const userData = {
      f_names,
      email,
      tel,
    };
  
    console.log(userData);
  
    try {
      // Send POST request
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify(userData),
      });
  
      if (res.ok) {
        // HTTP status code 200-299 indicates success
        alert("Form submitted successfully!");
      } else {
        // Handle other HTTP status codes (failure)
        alert("Form submission failed. Please try again.");
      }
  
    } catch (error) {
      // Handle errors
      alert("An error occurred while submitting the form. Please try again later.");
    } finally {
      // Reset the form values whether there was success or failure
      job_Seekers_form.reset();
    }
  });
  

employers_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values (company)
  const name = document.getElementById("co_name").value;
  const tel = document.getElementById("co_tel").value;
  const companyLocation = document.getElementById("co_location").value;
  const companyAddress = document.getElementById("co_address").value;
  const companyJobTittle = document.getElementById("co_job_tittle").value;
  const email = document.getElementById("co_email").value;
  const companyFileInput = document.getElementById("co_file");

  // Create FormData object and append form values
  const formData = new FormData();
  formData.append("name", name);
  formData.append("tel", tel);
  formData.append("location", companyLocation);
  formData.append("address", companyAddress);
  formData.append("jobTittle", companyJobTittle);
  formData.append("email", email);
  formData.append("file", companyFileInput.files[0]);

  //const url = "http://localhost:2100/api/company/data";
  const companyUrl = "https://www.horizonhunt.co.ke/api/user/company/data";


  try {
      const res = await fetch(companyUrl, {
          method: "POST",
          body: formData,
      });

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
          console.log("Company data submitted successfully");
         
      } else {
          // Handle errors for non-2xx status codes
          console.log("Company data submission failed:", await res.json());
      }
  } catch (error) {
      console.log("Error during fetch:", error);
  }finally{
    employers_form.reset()
  }
});



})


  