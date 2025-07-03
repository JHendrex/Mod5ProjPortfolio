document.addEventListener("DOMContentLoaded", function() { //ensures the DOM is loaded before running script

    const sButton = document.getElementById("searchButton");
    const el = document.getElementById("text");
    // 1) grab the HTML, not textContent
    const rawHTML = el.innerHTML;

    function formSearch() {

        const query = document.getElementById("search").value.trim();

        // 2) reset if empty  
        if (!query) {  
            // strip any old <mark>…</mark>  
            el.innerHTML = rawHTML.replace(/<\/?mark>/gi, "");  
            return;  
        }

        // 3) build a global, case-insensitive RegExp  
        const re = new RegExp(query, "gi");

        // 4) first strip any old <mark>  
        const clean = rawHTML.replace(/<\/?mark>/gi, "");

        // 5) replace in the HTML string  
        //    use $& to refer to "the entire match"  
        const highlighted = clean.replace(re, (match) => `<mark>${match}</mark>`);

        // 6) write it back  
        el.innerHTML = highlighted;
    };
    sButton.addEventListener("click", formSearch); //add event listener to search button

    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

    if (form && result) { //check if form and result elements exist
        function validateForm() { //form validation function for the contact page
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const reason = document.getElementById("contactReason").value.trim();
            const message = document.getElementById("userMessage").value.trim();

            const fNameErr = document.getElementById("fName-error");
            const lNameErr = document.getElementById("lName-error");
            const emailErr = document.getElementById("email-error");
            const reasonErr = document.getElementById("contactReason-error");
            const messageErr = document.getElementById("userMessage-error");

            fNameErr.textContent = "";
            lNameErr.textContent = "";
            emailErr.textContent = "";
            reasonErr.textContent = "";
            messageErr.textContent = "";

            let isValid = true;


            if (firstName === "") {
                fNameErr.textContent = "Please enter your first name.";
                isValid = false;
            }

            if (lastName === "") {
                lNameErr.textContent = "Please enter your last name.";
                isValid = false;
            }

            if (email === "" || !email.includes("@") || !email.includes(".")) {
                emailErr.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            if (reason === "") {
                reasonErr.textContent = "Please select one option.";
                isValid = false;
            }

            if (message === "") {
                messageErr.textContent = "Please include a message with what you want to say.";
                isValid = false;
            }

            return isValid;
        }

        form.addEventListener('submit', function(e) {  
        e.preventDefault();
        if (!validateForm()) { //if form is not valid, do not submit
            return;
        }
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        });

        form.addEventListener('reset', function resetErrors() { //resets fields in form when called
            document.getElementById("fName-error").textContent = "";
            document.getElementById("lName-error").textContent = "";
            document.getElementById("email-error").textContent = "";
            document.getElementById("contactReason-error").textContent = "";
            document.getElementById("userMessage-error").textContent = "";
        });
    }

    //Only run this on Home.html
    const featured = document.getElementById("featText");
    if (featured) {
        const projects = ["Defeat the Evil Wizard","Ecommerce API","Open Trivia Database Question Generator"];
        function getRandProject () { //displays one project name to feature on home page
            const index = Math.floor(Math.random() * projects.length);
            featured.textContent = projects[index];
        }
        getRandProject(); //call function to get random project name
    }
});