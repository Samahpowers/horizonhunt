document.addEventListener("DOMContentLoaded", ()=>{
 form.style.display = "none";
const form = document.querySelector(".main-form")
const jobSeekers = document.querySelector("job-seekers")


form.addEventListener("click", () => {
    // Check the current display property
    if (form.style.display === "flex") {
        // If it's currently flex, hide the form
        form.style.display = "none";
    } else {
        // If it's not flex, show the form
        form.style.display = "flex";
    }
});




})
