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

function resetErrors() {
    
    document.getElementById("userMessage-error").textContent = "";
    document.getElementById("contactReason-error").textContent = "";
    document.getElementById("email-error").textContent = "";
}

function formSearch(e) {
    let updatedText = "";
    const textEl = document.getElementById("text");
    let text = textEl.textContent;
    /*updatedText = text.replace("<mark>","");
    updatedText = text.replace("</mark>","");*/
    console.log(updatedText)
    document.getElementById("text").textContent = updatedText;
	let searched = document.getElementById("search").value.trim();
    let newText = ""
    if (searched !== "") {
  	    let re = new RegExp(searched,"g"); // search for all instances {
		    newText = text.replace(re, "<mark>$1</mark>");
		    textEl.innerHTML = newText;
  }
}