function start_quiz(){
    console.log("Starting quiz....");

    document.querySelector("#main").innerHTML ="";
    document.querySelector("body").classList.remove("login");
    document.querySelector("body").classList.add("quiz")

    document.querySelector("#main").innerHTML =`
        <div><p>${username}</p> <button>log out</button></div>
        <div class="image"></div>
        <div class="options">
            <div id="o1"><div>
            <div id="o2"><div>
            <div id="o3"><div>
            <div id="o4"><div>
        </div>
    `;
}