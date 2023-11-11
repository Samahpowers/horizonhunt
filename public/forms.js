


  const jobSeekerSection = document.querySelector('.job-seekers-section');
  const employerSection = document.querySelector('.job-employers-section');

  const urlParams = new URLSearchParams(window.location.search);
  const buttonType = urlParams.get('buttonType');
  console.log(buttonType);

  if (buttonType === "jobseeker") {
   
    employerSection.style.display = "none";
  } else if (buttonType === "employer") { // Corrected the condition
    
    jobSeekerSection.style.display = "none";
  }
