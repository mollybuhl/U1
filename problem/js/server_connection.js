async function check_login(taker){
    const connect = document.createElement("div");
    connect.setAttribute("id", "connecting")
    document.querySelector("body").appendChild(connect);
    connect.textContent = "Contacting Server..."

    const rqst = new Request(`https://teaching.maumt.se/apis/access/${taker}`);

    const responce = await fetch(rqst);
    const resource = await responce.json();
    
    

    if(resource.ok){
        console.log("OK!" + " " + resource);
        connect.classList.add("unvisable");
    }else{
        connect.classList.add("unvisable");
        document.querySelector(".login > p").textContent = "Wrong user name or password";
        document.querySelector(".login > p").style.backgroundColor = "white";
    }
    
   
    
}