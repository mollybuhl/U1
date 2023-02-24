if(localStorage.getItem("show_quiz") === "true"){
    quiz_setup(localStorage.getItem("user"));
}else{
    login_setup();
}