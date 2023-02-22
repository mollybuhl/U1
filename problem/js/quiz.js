function start_quiz(user){

    //create_connecting_div();
    //document.querySelector("#connecting").classList.add("invisable");

    document.querySelector("#main").innerHTML ="";
    document.querySelector("#wrapper").classList.remove("login");
    document.querySelector("#wrapper").classList.add("quiz")

    document.querySelector("#main").innerHTML =`
        <div id="logout_bar"><p>${user}</p> <button id="logout">logout</button></div>
        <div id="question_wrapper">
            <div class="image"></div>
            <div class="options">
                <div id="o1"></div>
                <div id="o2"></div>
                <div id="o3"></div>
                <div id="o4"></div>
            </div>
        </div>
    `;

    answer_feedback();

    document.querySelector("#logout").addEventListener("click", log_out);

    fill_quiz();
}

async function fill_quiz(){
    info_finding_image();
    document.querySelector("#info_finding_image").classList.remove("hidden");            

    document.querySelector(".answer_feedback").classList.add("hidden");
    document.querySelectorAll(".options > div").forEach(div => {
        div.textContent = "";
    })

    let breed = ALL_BREEDS[random_number(ALL_BREEDS.length - 1)];

    const rqst = new Request(`https://dog.ceo/api/breed/${breed.url}/images`);
    const resource = await get_resource(rqst);
    const responce = await resource.json();
    const image_url = responce.message[0];

    document.querySelector(".image").innerHTML = `<img src="${image_url}">`;
    const correct_option = document.querySelector(`#o${random_number(4)}`);
    correct_option.textContent = `${breed.name}`;

    document.querySelector("#info_finding_image").classList.add("hidden");            

    for(let i = 1 ; i<5 ; i++){
        if(document.querySelector(`#o${i}`).textContent === ""){
            let alt_breed = breed;

            while(alt_breed === breed){
                alt_breed = ALL_BREEDS[random_number(ALL_BREEDS.length - 1)].name
            };
            
            document.querySelector(`#o${i}`).textContent = alt_breed;
        }  
    }

    document.querySelectorAll(".options > div").forEach(option => {
        option.addEventListener("click", check_answer);
    })

    function check_answer(event){
        const breed_name = event.target;
            
        if(breed_name.textContent === breed.name){
                
           document.querySelector("#info_finding_image").classList.remove("hidden");
           document.querySelector("#info_finding_image > div").classList.add("hidden");            
            
            document.querySelector(".answer_feedback").classList.remove("hidden");
            document.querySelector(".answer_feedback").style.backgroundColor =  "seaGreen";
            document.querySelector(".answer_feedback > p").textContent = "CORRECT!";

        }else{
            document.querySelector("#info_finding_image").classList.remove("hidden");
            document.querySelector("#info_finding_image > div").classList.add("hidden");            
            
            document.querySelector(".answer_feedback").classList.remove("hidden");
            document.querySelector(".answer_feedback").style.backgroundColor = "tomato";
            document.querySelector(".answer_feedback > p").textContent = "INCORRECT:(";            
        }
    }

}

function random_number(max) {
    return Math.floor((Math.random() * max)+1);
}

function log_out(){
    localStorage.removeItem("user");
    localStorage.setItem("show_quiz", "false");
    login_setup();
}


function answer_feedback(){
    const answer_feedback = document.createElement("div");
    answer_feedback.classList.add("answer_feedback");
    answer_feedback.classList.add("hidden");
    answer_feedback.innerHTML = `<p></p><button>ONE MORE</button>`;
    document.querySelector("#wrapper").appendChild(answer_feedback);

    document.querySelector(".answer_feedback > button").addEventListener("click", fill_quiz);
}

function info_finding_image(){
    const info_div = document.createElement("div");
    info_div.setAttribute("id", "info_finding_image");
    info_div.classList.add("hidden");
    document.querySelector("body").appendChild(info_div);
    info_div.innerHTML= `<div>Getting a random image...</div>`;

    document.querySelector("#info_finding_image > div").classList.remove("hidden");
}