async function check_login(rqst, action, username){

    document.querySelector("#connecting").classList.remove("hidden");

    const responce = await fetch_rqst(rqst);
    
    switch(responce.status){
        case 404:
            document.querySelector("#connecting").classList.add("hidden");
            document.querySelector(".login > p").textContent = "Wrong user name or password";
            document.querySelector(".login > p").style.backgroundColor = "white";
            break;
        case 200:
            if(action === "login"){
                document.querySelector("#connecting").classList.add("hidden");
                
                localStorage.setItem("show_quiz", "true")
                localStorage.setItem("user", username);
                const user = localStorage.getItem("user");

                quiz_setup(user);
            }else{
                feedback("Registration Complete.", "Please proceed to login.");
            }
            break;
        case 418:
            feedback("The server thinks it is not a teapot!");
            break;
        case 409:
            feedback("Sorry that name is taken.","Please try with another one.");        
            break;
        case 400:
            feedback("Please enter username and password.");        
            break;
        default:
            feedback("Sorry something went wrong, please try again."); 
    }

}

async function fetch_rqst(rqst){
    const responce = await fetch(rqst);
    return responce;
}


function feedback(message_line1, message_line2 =""){

    const feedback = document.createElement("div");
    feedback.setAttribute("id", "feedback");
    feedback.innerHTML = `<p>${message_line1} <br>${message_line2} </p> <button id="close_feedback">CLOSE</button>`;
    document.querySelector("body").appendChild(feedback);

    feedback.querySelector("button").addEventListener("click", close);

    function close(){
        feedback.classList.add("hidden");
        document.querySelector("#connecting").classList.add("hidden");
    }
}
