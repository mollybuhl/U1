function start_quiz(){

    document.querySelector("#main").innerHTML ="";
    document.querySelector("#wrapper").classList.remove("login");
    document.querySelector("#wrapper").classList.add("quiz")

    document.querySelector("#main").innerHTML =`
        <div id="logout_bar"><p>USERNAME</p> <button>logout</button></div>
        <div class="image"></div>
        <div class="options">
            <div id="o1"></div>
            <div id="o2"></div>
            <div id="o3"></div>
            <div id="o4"></div>
        </div>
    `;

    fill_quiz();
}

async function fill_quiz(){
    const breed = ALL_BREEDS[random_number(ALL_BREEDS.length)]

    const rqst = new Request(`https://dog.ceo/api/breed/${breed.url}/images`);
    const resource = await get_resource(rqst);
    const responce = await resource.json();
    const image_url = responce.message[0];

    document.querySelector(".image").style.backgroundImage = `url(${image_url})`;
    const correct_option = document.querySelector(`#o${random_number(4)}`);
    correct_option.textContent = `${breed.name}`;
    

    for(let i = 1 ; i<5 ; i++){
        if(document.querySelector(`#o${i}`).textContent === ""){
            document.querySelector(`#o${i}`).textContent = ALL_BREEDS[random_number(ALL_BREEDS.length)].name};
        }

        document.querySelectorAll(".options > div").forEach(option => {
            option.addEventListener("click", check_answer);
        })

        function check_answer(event){
            const breed_name = event.target;
            console.log(breed_name.textContent);
            if(breed_name.textContent === breed.name){
                console.log("Correct!");
            }else{
                console.log("False!");
            }
        }

}

function fill_options(){
    
}

function random_number(max) {
    return Math.floor((Math.random() * max)+1);
}