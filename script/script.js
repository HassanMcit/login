var signInUsername = document.querySelector(".sign-in-username");
var signInEmail = document.querySelector(".sign-in-email");
var signInPassword = document.querySelector(".sign-in-pass");
var signInSubmit = document.querySelector(".sign-in-submit");
var eyeClose = document.querySelector(".cursor");
var inputError = document.querySelector(".input-error");
var emailError = document.querySelector(".email-error");
var passwordError = document.querySelector(".password-error");
var errorMessage = document.getElementById("errorMessage");
var found = document.getElementById("found");
var numberOfClickOnEye = 0;
var usersList = [];


// localStorage.clear();

if (localStorage.length) {
    usersList = JSON.parse(localStorage.getItem("users"));
}

eyeClose.addEventListener('click', function (e) {
    numberOfClickOnEye++;
    switch (numberOfClickOnEye) {
        case 1:
            e.target.classList.replace("fa-eye-slash", "fa-eye");
            signInPassword.setAttribute("type", "text");
            break;
        case 2:
            e.target.classList.replace("fa-eye", "fa-eye-slash");
            signInPassword.setAttribute("type", "password");
            numberOfClickOnEye = 0;
            break;
    }
});

signInUsername.addEventListener('focus', function (e) {
    e.target.setAttribute("placeholder", "");
});

signInUsername.addEventListener('blur', function (e) {
    e.target.setAttribute("placeholder", "User Name");
    if (e.target.value === "" || inputError.classList.contains("d-block")) {
        e.target.classList.add("is-invalid");
        inputError.classList.add("d-block");
        inputError.classList.remove("d-none");
    }
});

signInEmail.addEventListener('focus', function (e) {
    e.target.setAttribute("placeholder", "");
});

signInEmail.addEventListener('blur', function (e) {
    e.target.setAttribute("placeholder", "Email");
    if (e.target.value === "" || emailError.classList.contains("d-block")) {
        e.target.classList.add("is-invalid");
        emailError.classList.add("d-block");
        emailError.classList.remove("d-none");
    }
});

signInPassword.addEventListener('focus', function (e) {
    e.target.setAttribute("placeholder", "");
});

signInPassword.addEventListener('blur', function (e) {
    e.target.setAttribute("placeholder", "Password Ex: Hasss@123");
    if (e.target.value === "" || emailError.classList.contains("d-block")) {
        e.target.classList.add("is-invalid");
        passwordError.classList.add("d-block");
        passwordError.classList.remove("d-none");
    }
});

signInUsername.addEventListener('input', function (e) {
    validatedInput(e.target);
});

signInEmail.addEventListener('input', function (e) {
    validatedInput(e.target);
});

signInPassword.addEventListener('input', function (e) {
    validatedInput(e.target);
});

function validatedInput(element) {
    var regex = {
        username: /^\w{3,}(\s+\w+)*$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
    };
    if (regex[element.id].test(element.value)) {
        if (element.classList.contains("sign-in-username")) {
            inputError.classList.replace("d-block", "d-none");
            errorMessage.classList.replace("d-block", "d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        }
        if (element.classList.contains("sign-in-email")) {
            emailError.classList.replace("d-block", "d-none");
            errorMessage.classList.replace("d-block", "d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        }
        if (element.classList.contains("sign-in-pass")) {
            passwordError.classList.replace("d-block", "d-none");
            errorMessage.classList.replace("d-block", "d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        }
    } else {
        element.classList.add("is-invalid");
        if (element.classList.contains("sign-in-username")) {
            inputError.classList.replace("d-none", "d-block");
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        }
        if (element.classList.contains("sign-in-email")) {
            emailError.classList.replace("d-none", "d-block");
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        }
        if (element.classList.contains("sign-in-pass")) {
            passwordError.classList.replace("d-none", "d-block");
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        }
    }
}

signInSubmit.addEventListener('click', function (e) {
    if (signInUsername.value === "" || inputError.classList.contains("d-block")) {
        errorMessage.classList.replace("d-none", "d-block");
    } else if (signInEmail.value === "" || emailError.classList.contains("d-block")) {
        errorMessage.classList.replace("d-none", "d-block");
        errorMessage.innerHTML = "Please Fill Email";
    } else if (signInPassword.value === "" || passwordError.classList.contains("d-block")) {
        errorMessage.classList.replace("d-none", "d-block");
        errorMessage.innerHTML = "Please Fill Password";
    } else {
        errorMessage.classList.replace("d-block", "d-none");
        addUser();
    }
});

function addUser() {
    var user = {
        userName: signInUsername.value,
        userEmail: signInEmail.value,
        userPassword: signInPassword.value,
    };
    if (localStorage.length) {
        if (isEmailFound(signInEmail.value)) {
            found.classList.replace("d-none", "d-block");
        } else {
            found.classList.replace("d-block", "d-none");
            usersList.push(user);
            localStorage.setItem("users", JSON.stringify(usersList));
        }
    }
    else {
        usersList.push(user);
        localStorage.setItem("users", JSON.stringify(usersList));
    }
    clearForm();
    if (eyeClose.classList.contains("fa-eye")) {
        eyeClose.classList.replace("fa-eye", "fa-eye-slash");
    }
}

function clearForm() {
    signInUsername.value = "";
    signInEmail.value = "";
    signInPassword.value = "";
    signInUsername.classList.remove("is-valid");
    signInEmail.classList.remove("is-valid");
    signInPassword.classList.remove("is-valid");
}

function isEmailFound(email) {
    var arr = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < arr.length; i++) {
        if (email.toLowerCase() === arr[i].userEmail.toLowerCase()) {
            return true;
        }
    }
    return false;
}