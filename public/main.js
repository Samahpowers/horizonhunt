const jobSeekerButtons = document.querySelectorAll(".job-seekers");
const employersButtons = document.querySelectorAll(".employers");

// Loop through each button and add a click event listener
jobSeekerButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Handle the click event
    console.log("Button clicked");
    const redirectURL = "/forms.html?buttonType=jobseeker"; // Use an absolute path
    console.log("Redirecting to:", redirectURL);
    window.location.href = redirectURL; // Perform the redirect
  });
});

employersButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Handle the click event
    console.log("Button clicked");
    const redirectURL = "/forms.html?buttonType=employer"; // Use an absolute path
    console.log("Redirecting to:", redirectURL);
    window.location.href = redirectURL; // Perform the redirect
  });
});
