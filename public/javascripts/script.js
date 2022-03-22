function login() {
    var email = document.getElementById('login_email').value;
    var password = document.getElementById('login_password').value;
    var heading = document.getElementById("login_heading");
    var login_div = document.getElementById('login');

    if (email.length > 0 && password.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


                if (xmlhttp.responseText === "login success") {
                    heading.innerHTML = "You have successfully logged in";
                    document.getElementById("login_form").remove();
                    document.getElementById("login_button").remove();
                    document.getElementById("register_button").remove();
                    var logout = document.createElement('a');
                    logout.id = 'logout_link';
                    logout.href = "javascript:logout()";
                    logout.innerHTML = "logout";
                    login_div.appendChild(logout);

                }
                else {
                    heading.innerHTML = xmlhttp.responseText;
                }
            }
        }

        xmlhttp.open("GET", `handleLogin?email=${email}&password=${password}`);
        xmlhttp.send();
    }
    else {
        alert("Please enter email and password");
        return;
    }
}

function logout() {
    var heading = document.getElementById("login_heading");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText === "logout success") {
                heading.innerHTML = "logout success";
                var logout = document.getElementById('logout_link');
                logout.id = 'login_link';
                logout.href = "../login.html";
                logout.innerHTML = "login";
            }
        }
    }

    xmlhttp.open("GET", "handleLogout", true);
    xmlhttp.send();
}


function register() {
    var email = document.getElementById('register_email').value;
    var password = document.getElementById('register_password').value;
    var password_confirm = document.getElementById('register_password_confirm').value;

    if (email.length > 0 && password.length > 0 && password_confirm.length > 0 && password_confirm === password) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


                if (xmlhttp.responseText === "This email have already been registered") {
                    alert("This email have already been registered");
                }
                else {
                    var body = document.getElementsByTagName('body')[0];
                    body.innerHTML = xmlhttp.responseText;
                }
            }
        }

        xmlhttp.open("GET", `handleRegister?email=${email}&password=${password}`);
        xmlhttp.send();
    }
    else {
        alert("Please enter all fields");
        return;
    }
}