function login_setup(){
    document.querySelector("#main").innerHTML ="";

    document.querySelector("#wrapper").classList.remove("register");
    document.querySelector("#wrapper").classList.remove("quiz");
    document.querySelector("#wrapper").classList.add("login");

    const login_setup_wrapper = document.createElement("div");
    login_setup_wrapper.classList.add("login");
    document.querySelector("#main").appendChild(login_setup_wrapper);

    login_setup_wrapper.innerHTML = `
        <h1>LOGIN</h1>
        <div><label> User Name: <input type="text" name="login_username"/></label></div>
        <div><label> Password: <input type="password" name="login_password"/></label></div>

        <p>Let the magic start!</p>
        <button>Login</button>

        <a>New to this? Register for free</a>
        `
    document.querySelector(".login > button").addEventListener("click", login);
    document.querySelector(".login > a").addEventListener("click", register_setup);

    create_connecting_div();
}

function login(){

    const username = document.getElementsByName("login_username")[0].value;
    const password = document.getElementsByName("login_password")[0].value;
    
    const login_rqst = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username}&password=${password}`);
    check_login(login_rqst, "login", username);
}

function register_setup(){

    document.querySelector("#main").innerHTML ="";
    document.querySelector("#wrapper").classList.remove("login");
    document.querySelector("#wrapper").classList.add("register");


    const register_setup_wrapper = document.createElement("div");
    register_setup_wrapper.classList.add("register");
    document.querySelector("#main").appendChild(register_setup_wrapper);

    register_setup_wrapper.innerHTML = `
        <h1>REGISTER</h1>
        <div><label> User Name: <input type="text" name="reg_username"/></label></div>
        <div><label> Password: <input type="password" name="reg_password"/></label></div>

        <p>Ready when you are...</p>
        <button>Register</button>

        <a>Already have an account? Go to login</a>
    `
    document.querySelector(".register > a").addEventListener("click", login_setup);
    document.querySelector(".register > button").addEventListener("click", register);

}

function register(){

    const username = document.getElementsByName("reg_username")[0].value;
    const password = document.getElementsByName("reg_password")[0].value;
    
    const post_body = {
        action: "register",
        user_name: username,
        password: password,
    }

    const register_rqst = new Request(`https://teaching.maumt.se/apis/access/`, {
        method: 'POST',
		body: JSON.stringify(post_body),
		headers: {"Content-type": "application/json; charset=UTF-8"}
	});


    check_login(register_rqst, "register");

}

function create_connecting_div(){
    const connect = document.createElement("div");
    connect.setAttribute("id", "connecting");
    connect.classList.add("hidden");
    document.querySelector("body").appendChild(connect);
    connect.innerHTML= `<div>Contacting Server...</div>`;
}