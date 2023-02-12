function login_setup(){
    document.querySelector("#main").innerHTML ="";

    document.querySelector("body").classList.remove("register");
    document.querySelector("body").classList.add("login");

    const login_setup = document.createElement("div");
    login_setup.classList.add("login");
    document.querySelector("#main").appendChild(login_setup);

    login_setup.innerHTML = `
    <h1>LOGIN</h1>
    <div><label> User Name: <input type="text" name="login_username"/>
    </label></div>
    <div><label> Password: <input type="text" name="login_password"/>
    </label></div>

    <p>Let the magic start!</p>
    <button id="login_btn">Login</button>

    <a>New to this? Register for free</a>
    `
    document.querySelector(".login > button").addEventListener("click", login);
    document.querySelector(".login > a").addEventListener("click", register_setup);
}

function login(){
    console.log("Login");

    const username = document.getElementsByName("login_username")[0].value;
    const password = document.getElementsByName("login_password")[0].value;
    
    const sender = `?action=check_credentials&user_name=${username}&password=${password}`
    check_login(sender)
}

function register_setup(){

    document.querySelector("#main").innerHTML ="";
    document.querySelector("body").classList.remove("login");
    document.querySelector("body").classList.add("register");


    const register_setup = document.createElement("div");
    register_setup.classList.add("register");
    document.querySelector("#main").appendChild(register_setup);

    register_setup.innerHTML = `
        <h1>REGISTER</h1>
        <div><label> User Name: <input type="text" name="reg_username"/>
        </label></div>
        <div><label> Password: <input type="text" name="reg_password"/>
        </label></div>

        <p>Ready when you are</p>
        <button id="reg_btn">Register</button>

        <a>Already have an account? Go to login</a>
    `
    document.querySelector(".register > a").addEventListener("click", login_setup);
    document.querySelector(".register > button").addEventListener("click", register);

}

function register(){

    const username = document.getElementsByName("reg_username")[0].value;
    const password = document.getElementsByName("reg_password")[0].value;
    
    const sender = `?action=check_credentials&user_name=${username}&password=${password}`
    check_login(sender)

}