
var INCORRECT_DETAILS = "Username and password entered by you is/are incorrect.";
var INVALID_EMAIL = "You have entered invalid email address";
var INVALID_PASSWORD = "You have entered invalid password";


function getCredentialValueFromForm() {
    let loginForm = document.forms['loginForm'];
    if (loginForm && loginForm.length > 1) {
        let email = loginForm[0].value;
        let password = loginForm[1].value
        return { email: email, password: password};
    }
    return { email: '', password: ''};
}

function performValidationOperations(validator) {
    if (!validator.valid) {
        let loginForm = document.forms['loginForm'];
        if (!validator.data.email && loginForm && loginForm.length) {
            var span = document.createElement('span');
            span.setAttribute("class", "error");
            span.setAttribute("id", "emailError");
            span.innerHTML = INVALID_EMAIL;
            var parent = loginForm[0].parentElement;
            if (!document.getElementById("emailError"))
                parent.appendChild(span);
        }
        if (!validator.data.password && loginForm && loginForm.length) {
            var span = document.createElement('span');
            span.setAttribute("class", "error");
            span.setAttribute("id", "passwordError");
            span.innerHTML = INVALID_PASSWORD;
            var parent = loginForm[1].parentElement
            if (!document.getElementById("passwordError"))
                parent.appendChild(span);
        }
        return false;
    }
    return true;
}

function performAuthOperations(isAuthenticated) {
    let loginForm = document.forms['loginForm'];
    if (!isAuthenticated && loginForm && loginForm.length) {
        var span = document.createElement('span');
        span.setAttribute("class", "error");
        span.setAttribute("id", "incorrectCredError");
        span.innerHTML = INCORRECT_DETAILS;
        var parent = loginForm[2].parentElement.parentElement
        if (!document.getElementById("incorrectCredError"))
            parent.prepend(span);
        return false;
    }
    return true;
}

function onLoginFormSubmit(event) {
    event.preventDefault();
    removeAllErrorNodes();
    const cred = getCredentialValueFromForm();
    var validator = validateEmailPassword(cred.email, cred.password);
    const validatorOps = performValidationOperations(validator);
    if (!validatorOps) {
        return false;
    }     
    var isAuthenticated = checkIfCredentialsValid(cred.email, cred.password);
    const authOpr = performAuthOperations(isAuthenticated);
    if(!authOpr) {
        return false;
    }
    window.location = 'home.html';
    removeAllErrorNodes();
    return true;

}

function validateEmailPassword(email, password) {    
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);

    let result = {
        valid: false,
        data: {
            email: validEmail,
            password: validPassword
        }
    }
    if (validEmail && validPassword) {
        result.valid = true;
    }
    return result;
}

function checkIfCredentialsValid(email, password) {
    if (email == 'chaudharyannu7@gmail.com' &&
        password == 'Annu@1234') {
        const token = btoa(email + ":" + password);
        localStorage.setItem("authToken", token);
        return true;
    }
    
    return false;
    
}

function removeAllErrorNodes() {
    var errorNodes = document.querySelectorAll("span[class=error]");
    if (errorNodes && errorNodes.length)
        errorNodes.forEach((node, index) => node.remove());
}

// module.exports = {
//  // checkForLoginSignUpVisibility: checkForLoginSignUpVisibility,
//     onLoginFormSubmit: onLoginFormSubmit,
//     validateEmailPassword: validateEmailPassword,   
//     checkIfCredentialsValid: checkIfCredentialsValid,
//     removeAllErrorNodes: removeAllErrorNodes
// };
exports = [onLoginFormSubmit, validateEmailPassword, checkIfCredentialsValid, removeAllErrorNodes, performAuthOperations, performValidationOperations, getCredentialValueFromForm];