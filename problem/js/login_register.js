function login_setup(){
    const login_setup = document.createElement("div");
    login_setup.classList.add("login");
    document.querySelector("#main").appendChild(login_setup);

    login_setup.innerHTML = `
    <h1>LOGIN</h1>
    <div><label> User Name: <input type="text" name="username"/>
    </label></div>
    <div><label> Password: <input type="text" name="username"/>
    </label></div>

    <p>Let the magic start!</p>
    <button>Login</button>

    <a>New to this? Register for free</a>
    `
    document.querySelector(".login > button").addEventListener("click", login);
    document.querySelector(".login > a").addEventListener("click", register);
}

function login(){
    console.log("Login");
}

function register(){
    console.log("Register");
}