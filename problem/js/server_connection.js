async function check_login(rqst, action){

    document.querySelector("#connecting").classList.remove("invisable");

    const responce = await get_resource(rqst);

    switch(responce.status){
        case 404:
            document.querySelector("#connecting").classList.add("invisable");
            document.querySelector(".login > p").textContent = "Wrong user name or password";
            document.querySelector(".login > p").style.backgroundColor = "white";
            
            break;
        case 200:
            if(action === "login"){
                document.querySelector("#connecting").classList.add("invisable");
                start_quiz();
            }else{
                feedback("Registration Complete. Pleace proceed to login.");
            }
            break;
        case 418:
            feedback("The server thinks it is not a teapot!");
            break;
        case 409:
            feedback("Sorry that name is taken. Please try another one.");        
            console.log("already a user");
            break;
        default:
            feedback("Sorry something went wrong, please try again."); 
            console.log("BUG");
    }

}

async function get_resource(rqst){
    const responce = await fetch(rqst);
    return responce;
    
}

function feedback(message){

    const feedback = document.createElement("div");
    feedback.setAttribute("id", "feedback");
    feedback.innerHTML = `<p>${message}<p> <button>close</button>`
    document.querySelector("body").appendChild(feedback);

    feedback.querySelector("button").addEventListener("click", close)
    function close(){
        feedback.classList.add("visable");
        document.querySelector("#connecting").classList.add("invisable");
    }
    
}