function quiz_setup(user){

    document.querySelector("#main").innerHTML ="";
    document.querySelector("#wrapper").classList.remove("login");
    document.querySelector("#wrapper").classList.add("quiz");

    document.querySelector("#main").innerHTML =`
        <div id="logout_bar">
            <p>${user}</p> 
            <button id="logout">logout</button>
        </div>
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

    document.querySelector("#logout").addEventListener("click", log_out);

    answer_feedback();
    info_getting_random_image();

    fill_quiz();
}

async function fill_quiz(){
    document.querySelector(".answer_feedback").classList.add("hidden");
    document.querySelector("#info_getting_random_image").classList.remove("hidden");    
    document.querySelector("#info_getting_random_image > div").classList.remove("hidden");    
    
    document.querySelector(".image").innerHTML = `<img src="./media/logo.png">`;
    
    document.querySelectorAll(".options > div").forEach(div => {
        div.textContent = "";
    })

    let breed = ALL_BREEDS[random_number(ALL_BREEDS.length - 1)];

    const rqst = new Request(`https://dog.ceo/api/breed/${breed.url}/images`);
    const responce = await fetch_rqst(rqst);
    const resource = await responce.json();

    let total_images = resource.message.length;
    const image_url = resource.message[random_number(total_images - 1)];

    if(image_url === undefined){
        document.querySelector(".image").innerHTML = `<img src="./media/logo.png">`;
    }else{
        document.querySelector(".image").innerHTML = `<img src="${image_url}">`;
    }

    const correct_option = document.querySelector(`#o${random_number(4)}`);
    correct_option.textContent = `${breed.name}`;

    document.querySelector("#info_getting_random_image").classList.add("hidden");  
            
    fill_options(breed);
    
}

function fill_options(breed){
    let all_breed_options = [breed.name];

    for(let i = 1 ; i<5 ; i++){
        if(document.querySelector(`#o${i}`).textContent === ""){

            fill_alt();

            function fill_alt(){
                let new_alt = ALL_BREEDS[random_number(ALL_BREEDS.length - 1)].name;
                if(!all_breed_options.includes(new_alt)){
                    all_breed_options.push(new_alt)
    
                    document.querySelector(`#o${i}`).textContent = new_alt;
                }else{
                    fill_alt();
                }
            }
        }
    }  
    
    document.querySelectorAll(".options > div").forEach(option => {
        option.addEventListener("click", check_answer);
    });

    function check_answer(event){
        const option_breed_name = event.target;
            
        if(option_breed_name.textContent === breed.name){
                
           document.querySelector("#info_getting_random_image").classList.remove("hidden");
           document.querySelector("#info_getting_random_image > div").classList.add("hidden");            
            
            document.querySelector(".answer_feedback").classList.remove("hidden");
            document.querySelector(".answer_feedback").style.backgroundColor =  "seaGreen";
            document.querySelector(".answer_feedback > p").textContent = "CORRECT!";

        }else{
            document.querySelector("#info_getting_random_image").classList.remove("hidden");
            document.querySelector("#info_getting_random_image > div").classList.add("hidden");            
            
            document.querySelector(".answer_feedback").classList.remove("hidden");
            document.querySelector(".answer_feedback").style.backgroundColor = "tomato";
            document.querySelector(".answer_feedback > p").textContent = "INCORRECT:(";    
        }
    }
}

function random_number(max) {
    return Math.floor((Math.random() * max)+1);
}

function answer_feedback(){
    const answer_feedback = document.createElement("div");
    answer_feedback.classList.add("answer_feedback");
    answer_feedback.classList.add("hidden");
    answer_feedback.innerHTML = `<p></p><button>ONE MORE</button>`;
    document.querySelector("body").appendChild(answer_feedback);

    document.querySelector(".answer_feedback > button").addEventListener("click", fill_quiz);
}

function info_getting_random_image(){
    const info_div = document.createElement("div");
    info_div.setAttribute("id", "info_getting_random_image");
    info_div.classList.add("hidden");
    document.querySelector("body").appendChild(info_div);
    info_div.innerHTML= `<div>Getting a random image...</div>`;

    document.querySelector("#info_getting_random_image > div").classList.remove("hidden");
}

function log_out(){
    localStorage.removeItem("user");
    localStorage.setItem("show_quiz", "false");
    login_setup();
}