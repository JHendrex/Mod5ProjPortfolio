function validateForm() { //form validation function for the contact page
    
    const email = document.getElementById("email").value;
    const reason = document.getElementById("contactReason").value;
    const message = document.getElementById("userMessage").value;

    
    const emailErr = document.getElementById("email-error");
    const reasonErr = document.getElementById("contactReason-error");
    const messageErr = document.getElementById("userMessage-error");

    
    emailErr.textContent = "";
    reasonErr.textContent = "";
    messageErr.textContent = "";

    let isValid = true;



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




    if (isValid) {
        alert("Form submitted successfully!");
        return true;
    }
    else {
        return false;
    }
}

function resetErrors() { //resets fields in form when called
    
    document.getElementById("firstName").textContent = "";
    document.getElementById("lastName").textContent = "";
    document.getElementById("userMessage-error").textContent = "";
    document.getElementById("contactReason-error").textContent = "";
    document.getElementById("email-error").textContent = "";
}

function formSearch() {
    const el = document.getElementById("text");
    // 1) grab the HTML, not textContent
    const rawHTML = el.innerHTML;
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
}


function getRandProject () {
    const featured = document.getElementById("featText");
    const projects = ["Defeat the Evil Wizard","Ecommerce API","Event Center Website"];
    const index = Math.floor(Math.random()*projects.length);
    featured.textContent = projects[index];
}