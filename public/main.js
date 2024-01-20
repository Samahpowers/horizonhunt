const jobSeekerButtons = document.querySelectorAll(".job-seekers");
const employersButtons = document.querySelectorAll(".employers");
const location_links = document.querySelectorAll("#job_location a")

// Loop through each button and add a click event listener
jobSeekerButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Handle the click event
    console.log("Button clicked");
    const redirectURL = "/forms_jobseeker.html"; // Use an absolute path
    console.log("Redirecting to:", redirectURL);
    window.location.href = redirectURL; // Perform the redirect
  });
});

employersButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Handle the click event
    console.log("Button clicked");
    const redirectURL = "/forms_employers.html"; // Use an absolute path
    console.log("Redirecting to:", redirectURL);
    window.location.href = redirectURL; // Perform the redirect
  });
});


location_links.forEach((l_link)=>{
  l_link.addEventListener("click", (e)=>{
    e.preventDefault()       
    const locationName = e.target.textContent
    console.log(locationName)
    const userResponse = window.confirm(`Do you want to apply for job in ${locationName}`)

    if(userResponse){
      const userResponseOk = window.confirm(`Click on OK and provide the following 1. Name 2. Tel. You will be directed to your email to apply job/s for ${locationName} `)
      if(userResponseOk){
        window.location.href = "mailto:info@horizonhunt.co.ke";
      }
    }else{
      window.href = "/"
    }
  })
})