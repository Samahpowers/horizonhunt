
const jobs = document.querySelectorAll("#jobList a");

jobs.forEach((aTag) => {
    aTag.addEventListener("click", (e) => {
        e.preventDefault();

        // Show an alert asking the user if they want to apply for the clicked job
        const jobTitle = e.target.textContent;
        const userResponse = window.confirm(`Do you want to apply for ${jobTitle}?`);

        if (userResponse) {
            // User clicked OK, proceed to the specified mailto link
            const userResponseOk =window.confirm(`provide the following 1. Name 2. Tel  and upload CV (optional) you will be contacted for further requirements on ${jobTitle} job you are applying by clicking OK Horizon Hunt International will direct you to your email to make the application thereof `)
            if(userResponseOk){
                window.location.href = aTag.href;
            }
            
        } else {
            // User clicked Cancel
            console.log(`User decided not to apply for ${jobTitle}`);
        }
    });
});
