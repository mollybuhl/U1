if(localStorage.getItem("show_quiz") === "true"){
    start_quiz(localStorage.getItem("user"));
}else{
    login_setup();
}