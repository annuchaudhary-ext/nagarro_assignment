function checkForLogin() {
    var token = localStorage.getItem("authToken");
    if (token) {
        var creds = atob(token).split(":");
        if (creds.length == 2 && creds[0] === 'chaudharyannu7@gmail.com')
            return
    }
    navigateToLoginPage();
}

function navigateToLoginPage() {
    window.location = 'index.html';
}

checkForLogin();