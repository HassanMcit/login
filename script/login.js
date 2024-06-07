var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginSubmit = document.querySelector(".login-submit");
var wrong = document.querySelector("#wrong-data");
var required = document.querySelector("#required-data");
var welcome = document.querySelector(".welcome-msgs");
var indexFound = -1;
var welcomeName;
var login = false;

loginSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (loginEmail.value == "" || loginPassword == "") {
        required.classList.replace("d-none", "d-block");
    } else {
        if (isEmailFound(loginEmail.value) && isPasswordFound(loginPassword.value, indexFound)) {
            required.classList.replace("d-block", "d-none");
            wrong.classList.replace("d-block", "d-none");
            login = true;
            welcome = JSON.parse(localStorage.getItem("users"))[indexFound].userName;
            localStorage.setItem("index", JSON.stringify(indexFound));
            location.assign("home.html");
        } else {
            required.classList.replace("d-block", "d-none");
            wrong.classList.replace("d-none", "d-block");
        }
    }
});

function isEmailFound(email) {
    var arr = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < arr.length; i++) {
        if (email.toLowerCase() === arr[i].userEmail.toLowerCase()) {
            indexFound = i;
            return true;
        }
    }
    return false;
}

function isPasswordFound(password, index) {
    var arr = JSON.parse(localStorage.getItem("users"));
    if (password.toLowerCase() === arr[index].userPassword.toLowerCase()) {
        return true;
    }
    return false;
}

