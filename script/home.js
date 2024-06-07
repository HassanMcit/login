var welcome = document.querySelector(".welcome-msgs");
var text = `Welcome ${JSON.parse(localStorage.getItem("users"))[JSON.parse(localStorage.getItem("index"))].userName}`;
welcome.firstElementChild.innerHTML = text;
var logout = document.getElementById("closed");
logout.addEventListener('click', function (e) {
    e.stopPropagation();
    location.assign("login.html");
});