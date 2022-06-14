/* TODO:
- make sure it's a ssc email (what's the email domain name?)
- if user has forgotten password
- do we need to send a confirmation email?
*/
function login() {
    // all variables
    var email = document.getElementById( 'login_email' ).value;
    var password = document.getElementById( 'login_password' ).value;
    var heading = document.getElementById( "login_heading" );
    var login_div = document.getElementById( 'login' );

    var email_err = document.getElementById( 'email_err' );
    var pwd_err = document.getElementById( 'pwd_err' );

    // hide all existing errors if any
    // (... too lazy to hide under err_message class)
    email_err.style.visibility = "hidden";
    pwd_err.style.visibility = "hidden";

    // if there's an input in email
    if ( email.length > 0 ) {
        // if there's an input in pwd
        if ( password.length > 0 ) {
            // check validity
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {

                    // if email and pwd is valid
                    if ( xmlhttp.responseText === "login success" ) {
                        heading.innerHTML = "You have successfully logged in";
                        document.getElementById( "login_form" ).remove();
                        document.getElementById( "login_button" ).remove();
                        document.getElementById( "register_button" ).remove();
                        var logout = document.createElement( 'a' );
                        logout.id = 'logout_link';
                        logout.href = "javascript:logout()";
                        logout.innerHTML = "logout";
                        login_div.appendChild( logout );

                    }
                    // else show error
                    else {
                        heading.innerHTML = xmlhttp.responseText;
                        pwd_err.innerHTML = "Invalid email or password";
                        pwd_err.style.visibility = "visible";
                    }
                }
            }

            xmlhttp.open( "GET", `handleLogin?email=${email}&password=${password}` );
            xmlhttp.send();
        }
        // prompt to input password
        else {
            pwd_err.innerHTML = "Please enter a password";
            pwd_err.style.visibility = "visible";
        }
    }
    // prompt to input email
    else {
        email_err.innerHTML = "Please enter an email";
        email_err.style.visibility = "visible";

        return;
    }
}

function logout() {
    var heading = document.getElementById( "login_heading" );

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            if ( xmlhttp.responseText === "logout success" ) {
                heading.innerHTML = "logout success";
                var logout = document.getElementById( 'logout_link' );
                logout.id = 'login_link';
                logout.href = "../login.html";
                logout.innerHTML = "login";
            }
        }
    }

    xmlhttp.open( "GET", "handleLogout", true );
    xmlhttp.send();
}

function ValidateEmail( email ) {
    // TOFIX
    var splitted = email.match( "^(.+)@gmail\.com$" );
    if ( splitted == null ) return false;
    if ( splitted[1] != null ) {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if ( splitted[1].match( regexp_user ) == null ) return false;
        return true;
    }
    return false;
}

function register() {
    // all variables
    var email = document.getElementById( 'register_email' ).value;
    var password = document.getElementById( 'register_password' ).value;
    var password_confirm = document.getElementById( 'register_password_confirm' ).value;

    var email_err = document.getElementById( 'email_err' );
    var pwd_err = document.getElementById( 'pwd_err' );
    var pwd_con_err = document.getElementById( 'pwd_con_err' );

    // hide all existing errors if any
    // (... too lazy to hide under err_message class)
    email_err.style.visibility = "hidden";
    pwd_err.style.visibility = "hidden";
    pwd_con_err.style.visibility = "hidden";

    // if there's an input in email
    if ( email.length > 0 && ValidateEmail( email ) ) {
        // if password is at least 8 char long
        if ( password.length >= 8 && password_confirm.length >= 8 ) {
            // if both pwd inputs are the same
            if ( password_confirm === password ) {
                // check validity
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {

                        // if email already registered
                        if ( xmlhttp.responseText === "This email have already been registered" ) {
                            email_err.innerHTML = "This email have already been registered";
                            email_err.style.visibility = "visible";
                        }
                        else {
                            var body = document.getElementsByTagName( 'body' )[0];
                            body.innerHTML = xmlhttp.responseText;
                        }
                    }
                }

                xmlhttp.open( "GET", `handleRegister?email=${email}&password=${password}` );
                xmlhttp.send();
            }
            // prompt to re-confirm passwords
            else {
                pwd_con_err.innerHTML = "The passwords does not match";
                pwd_con_err.style.visibility = "visible";
            }
        }
        // prompt to remake a password
        else {
            pwd_err.innerHTML = "Please input a password of at least 8 characters";
            pwd_err.style.visibility = "visible";
        }
    }
    // prompt to input email
    else {
        email_err.innerHTML = "Please input your school email";
        email_err.style.visibility = "visible";
        return;
    }
}

function forgotpwd() {
    // TODO
}