function start_quiz(){

    document.querySelector("#main").innerHTML ="";
    document.querySelector("body").classList.remove("login");
    document.querySelector("body").classList.add("quiz")

    document.querySelector("#main").innerHTML =`
        <div id="logout_bar"><p>USERNAME</p> <button>logout</button></div>
        <div class="image"></div>
        <div class="options">
            <div id="o1">1</div>
            <div id="o2">2</div>
            <div id="o3">3</div>
            <div id="o4">4</div>
        </div>
    `;

    quiz();
}

async function quiz(){
    const breed = ALL_BREEDS[random_number(ALL_BREEDS.length)]

   const rqst = new Request(` https://dog.ceo/api/breed/${breed.url}/images`);
   const resource = await get_resource(rqst);
   const responce = await resource.json();
   const image_url = responce.message[0];

   console.log(responce.message);
   console.log(image_url);

   document.querySelector(".image").style.backgroundImage = `url(${image_url})`;
}


function random_number(max) {
    return Math.floor(Math.random() * max);
}